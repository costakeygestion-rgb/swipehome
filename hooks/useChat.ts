import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import type { Message, Conversation, Match, Property, Profile } from '../lib/types';
import { SEED_PROPERTIES } from '../lib/seedData';
import { useMatchStore } from '../stores/matchStore';

export function useChat() {
  const { session } = useAuthStore();
  const { matches } = useMatchStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Build conversations from matches (seed data for now)
  useEffect(() => {
    const convos: Conversation[] = matches
      .filter((m) => m.property)
      .map((match) => ({
        match_id: match.id,
        property: match.property!,
        other_user: {
          id: match.property!.owner_id,
          full_name: match.property!.managed_by || 'Propietario',
          avatar_url: null,
          phone: null,
          role: 'owner' as const,
          company_name: match.property!.managed_by,
          partner_network: !!match.property!.managed_by,
          location_lat: null,
          location_lng: null,
          created_at: '',
        },
        last_message: null,
        unread_count: 0,
      }));
    setConversations(convos);
  }, [matches]);

  return {
    conversations,
    isLoading,
  };
}

export function useChatMessages(matchId: string) {
  const { session } = useAuthStore();
  const userId = session?.user?.id || 'local-user';
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to realtime messages
  useEffect(() => {
    if (!matchId) return;

    // Load existing messages from Supabase
    const loadMessages = async () => {
      setIsLoading(true);
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('match_id', matchId)
        .order('created_at', { ascending: true });
      if (data) setMessages(data as Message[]);
      setIsLoading(false);
    };

    loadMessages();

    // Realtime subscription
    const channel = supabase
      .channel(`messages:${matchId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          const newMessage = payload.new as Message;
          setMessages((prev) => [...prev, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [matchId]);

  const sendMessage = useCallback(
    async (content: string) => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        match_id: matchId,
        sender_id: userId,
        content,
        read_at: null,
        created_at: new Date().toISOString(),
      };

      // Optimistic update
      setMessages((prev) => [...prev, newMessage]);

      // Save to Supabase
      await supabase.from('messages').insert({
        match_id: matchId,
        sender_id: userId,
        content,
      });
    },
    [matchId, userId]
  );

  return {
    messages,
    isLoading,
    sendMessage,
    userId,
  };
}

export const QUICK_REPLIES = [
  '¿Está disponible?',
  '¿Puedo agendar una visita?',
  '¿Acepta mascotas?',
  '¿Precio negociable?',
  '¿Gastos incluidos?',
  '¿Fecha de disponibilidad?',
];
