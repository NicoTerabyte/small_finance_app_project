import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Crea il client Supabase con le opzioni corrette
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
      {
        auth: {
          flowType: 'implicit', // Più stabile del 'pkce' che causa errori di lock
          autoRefreshToken: true,
          persistSession: true,
          storageKey: 'finance-tracker-auth',
          detectSessionInUrl: false
        }
      }
    );

    // Carica l'utente se è già loggato
    this.loadUser();

    // Ascolta i cambiamenti di stato dell'autenticazione
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      if (session) {
        this.currentUserSubject.next(session.user);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  async loadUser() {
    try {
      const { data } = await this.supabase.auth.getSession();
      console.log('Session data:', data);
      if (data && data.session) {
        this.currentUserSubject.next(data.session.user);
      }
    } catch (error) {
      console.error('Error loading user session:', error);
    }
  }

  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({
      email,
      password
    });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.currentUser$.subscribe(user => {
        observer.next(!!user);
        observer.complete();
      });
    });
  }
}
