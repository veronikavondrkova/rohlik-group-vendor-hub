
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isRealSupabaseClient } from '@/lib/supabase';
import { Asset } from '@/components/review/AssetTypes';
import { useUser } from './UserContext';
import { useToast } from '@/hooks/use-toast';

interface AssetContextType {
  assets: Asset[];
  addAsset: (asset: Asset) => Promise<void>;
  updateAsset: (id: string, updates: Partial<Asset>) => Promise<void>;
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
        if (isRealSupabaseClient()) {
          // Fetch from real Supabase
          let query = supabase.from('assets').select('*');
          
          // If supplier, only fetch their own assets
          if (user.role === 'supplier') {
            query = query.eq('supplier', user.company);
          }

          const { data, error } = await query.order('dateSubmitted', { ascending: false });

          if (error) throw error;
          setAssets(data || []);
        } else {
          // Fetch from localStorage
          let localAssets = JSON.parse(localStorage.getItem('assets') || '[]');
          
          // If supplier, only fetch their own assets
          if (user.role === 'supplier' && user.company) {
            localAssets = localAssets.filter((asset: Asset) => asset.supplier === user.company);
          }
          
          // Sort by date (newest first)
          localAssets.sort((a: Asset, b: Asset) => {
            return new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime();
          });
          
          setAssets(localAssets);
        }
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

    // Set up real-time subscription if using real Supabase
    if (isRealSupabaseClient()) {
      const subscription = supabase
        .channel('assets')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'assets' 
          }, 
          (payload) => {
            switch (payload.eventType) {
              case 'INSERT':
                setAssets(current => [payload.new as Asset, ...current]);
                break;
              case 'UPDATE':
                setAssets(current => 
                  current.map(asset => 
                    asset.id === (payload.new as Asset).id 
                      ? payload.new as Asset 
                      : asset
                  )
                );
                break;
              case 'DELETE':
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
    }
  }, [user, toast]);

  const addAsset = async (asset: Asset) => {
    try {
      if (isRealSupabaseClient()) {
        // Add to real Supabase
        const { error } = await supabase.from('assets').insert(asset);
        if (error) throw error;
      } else {
        // Add to localStorage
        const assets = JSON.parse(localStorage.getItem('assets') || '[]');
        assets.push(asset);
        localStorage.setItem('assets', JSON.stringify(assets));
        
        // Update state immediately
        setAssets(current => [asset, ...current]);
      }

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
      if (isRealSupabaseClient()) {
        // Update in real Supabase
        const { error } = await supabase
          .from('assets')
          .update(updates)
          .eq('id', id);

        if (error) throw error;
      } else {
        // Update in localStorage
        const assets = JSON.parse(localStorage.getItem('assets') || '[]');
        const updatedAssets = assets.map((asset: Asset) => 
          asset.id === id ? { ...asset, ...updates } : asset
        );
        localStorage.setItem('assets', JSON.stringify(updatedAssets));
        
        // Update state immediately
        setAssets(current => 
          current.map(asset => 
            asset.id === id ? { ...asset, ...updates } : asset
          )
        );
      }

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
      if (isRealSupabaseClient()) {
        // Delete from real Supabase
        const { error } = await supabase
          .from('assets')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } else {
        // Delete from localStorage
        const assets = JSON.parse(localStorage.getItem('assets') || '[]');
        const filteredAssets = assets.filter((asset: Asset) => asset.id !== id);
        localStorage.setItem('assets', JSON.stringify(filteredAssets));
        
        // Update state immediately
        setAssets(current => current.filter(asset => asset.id !== id));
      }

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
