export interface UserProfile {
  id: string
  email: string
  display_name: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface CreateUserProfile {
  id: string
  email: string
  display_name?: string
  full_name?: string
  avatar_url?: string
}

export interface UpdateUserProfile {
  display_name?: string
  full_name?: string
  avatar_url?: string
} 