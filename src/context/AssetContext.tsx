import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, initializeSupabaseTables } from '@/lib/supabase';
import { Asset } from '@/components/review/AssetTypes';
import { useUser } from './UserContext';
import { useToast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';

interface AssetContextType {
  assets: Asset[];
  addAsset: (asset: Asset) => Promise<void>;
  updateAsset: (id: string, updates: Partial<Asset>) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
  isLoading: boolean;
}

const AssetContext = createContext<AssetContextType | undefined>(undefined);

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};

export const AssetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const { toast } = useToast();
  const [migrationAttempted, setMigrationAttempted] = useState(false);

  // Initialize Supabase tables when the component mounts
  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeSupabaseTables();
        console.log('Supabase tables initialized successfully from AssetContext');
      } catch (error) {
        console.error('Failed to initialize Supabase tables from AssetContext:', error);
      }
    };
    
    initialize();
  }, []);

  // Function to migrate local storage assets to Supabase
  const migrateLocalStorageAssets = async () => {
    try {
      if (!user) return;
      
      console.log('Checking for local assets to migrate...');
      // Check if there are assets in localStorage
      const localAssets = localStorage.getItem('assets');
      
      if (localAssets) {
        console.log('Found local assets:', localAssets);
        const parsedAssets = JSON.parse(localAssets) as Asset[];
        
        // Filter assets based on user role
        const userAssets = user.role === 'internal' 
          ? parsedAssets 
          : parsedAssets.filter(asset => asset.supplier === user.company);
        
        if (userAssets.length > 0) {
          console.log(`Migrating ${userAssets.length} assets...`);
          
          // For each asset, check if it already exists in Supabase
          for (const asset of userAssets) {
            // Ensure asset has an ID
            if (!asset.id) {
              asset.id = uuidv4();
            }
            
            // Check if asset exists in Supabase
            const { data: existingAsset, error: checkError } = await supabase
              .from('assets')
              .select('id')
              .eq('id', asset.id)
              .single();
              
            if (checkError && checkError.code !== 'PGRST116') {
              console.error('Error checking asset existence:', checkError);
              continue;
            }
              
            if (!existingAsset) {
              // Insert the asset into Supabase
              const { error: insertError } = await supabase.from('assets').insert(asset);
              
              if (insertError) {
                console.error('Error inserting asset during migration:', insertError);
              } else {
                console.log('Asset migrated successfully:', asset.id);
              }
            } else {
              console.log('Asset already exists in Supabase:', asset.id);
            }
          }
          
          toast({
            title: "Migration Complete",
            description: `${userAssets.length} assets have been migrated to the new system.`
          });
          
          // Clear localStorage after successful migration
          localStorage.removeItem('assets');
        } else {
          console.log('No assets to migrate for this user.');
        }
      } else {
        console.log('No assets found in localStorage.');
      }
    } catch (error) {
      console.error('Error migrating assets:', error);
    } finally {
      setMigrationAttempted(true);
    }
  };

  // Fetch assets based on user role
  useEffect(() => {
    const fetchAssets = async () => {
      if (!user) {
        setAssets([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Make sure tables exist
        await initializeSupabaseTables();
        
        // If migration hasn't been attempted yet, try to migrate
        if (!migrationAttempted) {
          await migrateLocalStorageAssets();
        }
        
        let query = supabase.from('assets').select('*');
        
        // If supplier, only fetch their own assets
        if (user.role === 'supplier') {
          query = query.eq('supplier', user.company);
        }

        const { data, error } = await query.order('dateSubmitted', { ascending: false });

        if (error) throw error;
        console.log('Fetched assets from Supabase:', data);
        setAssets(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to fetch assets",
          variant: "destructive"
        });
        console.error('Fetch assets error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssets();

    // Set up real-time subscription
    const subscription = supabase
      .channel('assets')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'assets' 
        }, 
        (payload) => {
          // Handle different types of changes
          switch (payload.eventType) {
            case 'INSERT':
              // For insert, add to the assets array if it belongs to this user
              if (user?.role === 'internal' || payload.new.supplier === user?.company) {
                setAssets(current => [payload.new as Asset, ...current]);
              }
              break;
            case 'UPDATE':
              // For update, update the matching asset
              setAssets(current => 
                current.map(asset => 
                  asset.id === (payload.new as Asset).id 
                    ? payload.new as Asset 
                    : asset
                )
              );
              break;
            case 'DELETE':
              // For delete, remove the asset from the array
              setAssets(current => 
                current.filter(asset => asset.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, [user, toast, migrationAttempted]);

  const addAsset = async (asset: Asset) => {
    try {
      const { error } = await supabase.from('assets').insert(asset);
      if (error) throw error;

      toast({
        title: "Success",
        description: "Asset added successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to add asset",
        variant: "destructive"
      });
      console.error('Add asset error:', error);
    }
  };

  const updateAsset = async (id: string, updates: Partial<Asset>) => {
    try {
      const { error } = await supabase
        .from('assets')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Asset updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update asset",
        variant: "destructive"
      });
      console.error('Update asset error:', error);
    }
  };

  const deleteAsset = async (id: string) => {
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Asset deleted successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete asset",
        variant: "destructive"
      });
      console.error('Delete asset error:', error);
    }
  };

  return (
    <AssetContext.Provider value={{ 
      assets, 
      addAsset, 
      updateAsset, 
      deleteAsset, 
      isLoading 
    }}>
      {children}
    </AssetContext.Provider>
  );
};
