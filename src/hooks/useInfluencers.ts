import { useState, useEffect, useCallback } from 'react';
import { Influencer, SortConfig, StatusFilter, VideoPost } from '../types';
import { supabase } from '../lib/supabase';

export const useInfluencers = () => {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'username',
    direction: 'asc'
  });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');

  // Load influencers
  useEffect(() => {
    const loadInfluencers = async () => {
      try {
        setLoading(true);
        const { data: influencersData, error: influencersError } = await supabase
          .from('influencers')
          .select(`
            *,
            video_posts (*)
          `)
          .order('created_at', { ascending: false });

        if (influencersError) throw influencersError;

        const formattedInfluencers: Influencer[] = influencersData.map(inf => ({
          id: inf.id,
          username: inf.username,
          profileUrl: inf.profile_url,
          platform: inf.platform,
          viewsMedian: inf.views_median,
          totalViews: inf.total_views,
          currentViews: inf.current_views,
          status: inf.status,
          isPaid: inf.is_paid,
          videoPosts: inf.video_posts.map(post => ({
            id: post.id,
            url: post.url || '',
            postedDate: post.posted_date || '',
            viewsCount: post.views_count
          }))
        }));

        setInfluencers(formattedInfluencers);
        setError(null);
      } catch (err) {
        console.error('Error loading influencers:', err);
        setError('Failed to load influencers data');
      } finally {
        setLoading(false);
      }
    };

    loadInfluencers();
  }, []);

  // Add influencer
  const addInfluencer = useCallback(async (influencerData: Omit<Influencer, 'id' | 'totalViews'>) => {
    try {
      setSaving(true);
      
      const totalViews = influencerData.viewsMedian * 5;
      
      // Insert influencer
      const { data: newInfluencer, error: influencerError } = await supabase
        .from('influencers')
        .insert({
          username: influencerData.username,
          profile_url: influencerData.profileUrl,
          platform: influencerData.platform,
          views_median: influencerData.viewsMedian,
          total_views: totalViews,
          current_views: influencerData.currentViews,
          status: influencerData.status,
          is_paid: influencerData.isPaid
        })
        .select()
        .single();

      if (influencerError) throw influencerError;

      // Insert video posts
      const videoPosts = influencerData.videoPosts.map(post => ({
        influencer_id: newInfluencer.id,
        url: post.url,
        posted_date: post.postedDate,
        views_count: post.viewsCount
      }));

      const { error: postsError } = await supabase
        .from('video_posts')
        .insert(videoPosts);

      if (postsError) throw postsError;

      // Reload influencers to get fresh data
      const { data: updatedInfluencer, error: fetchError } = await supabase
        .from('influencers')
        .select(`
          *,
          video_posts (*)
        `)
        .eq('id', newInfluencer.id)
        .single();

      if (fetchError) throw fetchError;

      const formattedInfluencer: Influencer = {
        id: updatedInfluencer.id,
        username: updatedInfluencer.username,
        profileUrl: updatedInfluencer.profile_url,
        platform: updatedInfluencer.platform,
        viewsMedian: updatedInfluencer.views_median,
        totalViews: updatedInfluencer.total_views,
        currentViews: updatedInfluencer.current_views,
        status: updatedInfluencer.status,
        isPaid: updatedInfluencer.is_paid,
        videoPosts: updatedInfluencer.video_posts.map(post => ({
          id: post.id,
          url: post.url || '',
          postedDate: post.posted_date || '',
          viewsCount: post.views_count
        }))
      };

      setInfluencers(prev => [formattedInfluencer, ...prev]);
      setError(null);
    } catch (err) {
      console.error('Error adding influencer:', err);
      setError('Failed to add influencer');
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  // Update influencer
  const updateInfluencer = useCallback(async (influencerData: Influencer) => {
    try {
      setSaving(true);

      // Update influencer
      const { error: influencerError } = await supabase
        .from('influencers')
        .update({
          username: influencerData.username,
          profile_url: influencerData.profileUrl,
          platform: influencerData.platform,
          views_median: influencerData.viewsMedian,
          total_views: influencerData.totalViews,
          current_views: influencerData.currentViews,
          status: influencerData.status,
          is_paid: influencerData.isPaid
        })
        .eq('id', influencerData.id);

      if (influencerError) throw influencerError;

      // Update video posts
      for (const post of influencerData.videoPosts) {
        const { error: postError } = await supabase
          .from('video_posts')
          .upsert({
            id: post.id,
            influencer_id: influencerData.id,
            url: post.url,
            posted_date: post.postedDate,
            views_count: post.viewsCount
          });

        if (postError) throw postError;
      }

      // Reload influencers to get fresh data
      const { data: updatedInfluencer, error: fetchError } = await supabase
        .from('influencers')
        .select(`
          *,
          video_posts (*)
        `)
        .eq('id', influencerData.id)
        .single();

      if (fetchError) throw fetchError;

      const formattedInfluencer: Influencer = {
        id: updatedInfluencer.id,
        username: updatedInfluencer.username,
        profileUrl: updatedInfluencer.profile_url,
        platform: updatedInfluencer.platform,
        viewsMedian: updatedInfluencer.views_median,
        totalViews: updatedInfluencer.total_views,
        currentViews: updatedInfluencer.current_views,
        status: updatedInfluencer.status,
        isPaid: updatedInfluencer.is_paid,
        videoPosts: updatedInfluencer.video_posts.map(post => ({
          id: post.id,
          url: post.url || '',
          postedDate: post.posted_date || '',
          viewsCount: post.views_count
        }))
      };

      setInfluencers(prev => 
        prev.map(inf => inf.id === influencerData.id ? formattedInfluencer : inf)
      );
      setError(null);
    } catch (err) {
      console.error('Error updating influencer:', err);
      setError('Failed to update influencer');
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  // Delete influencer
  const deleteInfluencer = useCallback(async (id: string) => {
    try {
      setSaving(true);
      
      const { error } = await supabase
        .from('influencers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInfluencers(prev => prev.filter(inf => inf.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting influencer:', err);
      setError('Failed to delete influencer');
    } finally {
      setSaving(false);
    }
  }, []);

  // Toggle paid status
  const togglePaidStatus = useCallback(async (id: string) => {
    try {
      setSaving(true);
      
      const influencer = influencers.find(inf => inf.id === id);
      if (!influencer) return;

      const { error } = await supabase
        .from('influencers')
        .update({ is_paid: !influencer.isPaid })
        .eq('id', id);

      if (error) throw error;

      setInfluencers(prev =>
        prev.map(inf =>
          inf.id === id ? { ...inf, isPaid: !inf.isPaid } : inf
        )
      );
      setError(null);
    } catch (err) {
      console.error('Error toggling paid status:', err);
      setError('Failed to update payment status');
    } finally {
      setSaving(false);
    }
  }, [influencers]);

  // Sort influencers
  const sortedInfluencers = useCallback(() => {
    if (!sortConfig) return influencers;

    return [...influencers].sort((a, b) => {
      if (a[sortConfig.field] < b[sortConfig.field]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.field] > b[sortConfig.field]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [influencers, sortConfig]);

  // Filter influencers
  const filteredInfluencers = useCallback(() => {
    const sorted = sortedInfluencers();
    if (statusFilter === 'All') return sorted;
    return sorted.filter(inf => inf.status === statusFilter);
  }, [sortedInfluencers, statusFilter]);

  // Request sort
  const requestSort = useCallback((field: SortConfig['field']) => {
    setSortConfig(prevSortConfig => {
      if (prevSortConfig.field === field) {
        return {
          ...prevSortConfig,
          direction: prevSortConfig.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { field, direction: 'asc' };
    });
  }, []);

  // Get campaign total views
  const getCampaignTotalViews = useCallback(() => {
    return influencers.reduce((sum, inf) => sum + inf.currentViews, 0);
  }, [influencers]);

  return {
    influencers: filteredInfluencers(),
    loading,
    saving,
    error,
    sortConfig,
    statusFilter,
    addInfluencer,
    updateInfluencer,
    deleteInfluencer,
    togglePaidStatus,
    requestSort,
    setStatusFilter,
    getCampaignTotalViews,
  };
};