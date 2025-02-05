export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      lr_files: {
        Row: {
          content_type: string
          created_at: string
          file_name: string
          file_path: string
          id: string
          size: number
        }
        Insert: {
          content_type: string
          created_at?: string
          file_name: string
          file_path: string
          id?: string
          size: number
        }
        Update: {
          content_type?: string
          created_at?: string
          file_name?: string
          file_path?: string
          id?: string
          size?: number
        }
        Relationships: []
      }
      lr_submissions: {
        Row: {
          bank_account_number: string | null
          bank_name: string | null
          brand_name: string
          brand_website: string | null
          contact_designation: string | null
          contact_email: string | null
          contact_name: string | null
          country: string | null
          created_at: string
          currency: string
          email: string
          file_path: string | null
          id: string
          ifsc_code: string | null
          name: string
          note: string | null
          payment_method: string
          paypal_email: string | null
          phone: string
        }
        Insert: {
          bank_account_number?: string | null
          bank_name?: string | null
          brand_name: string
          brand_website?: string | null
          contact_designation?: string | null
          contact_email?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string
          currency: string
          email: string
          file_path?: string | null
          id?: string
          ifsc_code?: string | null
          name: string
          note?: string | null
          payment_method: string
          paypal_email?: string | null
          phone: string
        }
        Update: {
          bank_account_number?: string | null
          bank_name?: string | null
          brand_name?: string
          brand_website?: string | null
          contact_designation?: string | null
          contact_email?: string | null
          contact_name?: string | null
          country?: string | null
          created_at?: string
          currency?: string
          email?: string
          file_path?: string | null
          id?: string
          ifsc_code?: string | null
          name?: string
          note?: string | null
          payment_method?: string
          paypal_email?: string | null
          phone?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          designation: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          designation?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          designation?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      rne_registrations: {
        Row: {
          created_at: string
          email: string
          id: string
          linkedin: string
          name: string
          phone: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          linkedin: string
          name: string
          phone: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          linkedin?: string
          name?: string
          phone?: string
        }
        Relationships: []
      }
      rne_submissions: {
        Row: {
          business_name: string
          business_website: string
          contact_designation: string
          contact_email: string
          contact_name: string
          created_at: string
          id: string
          note: string
          unique_id: string
        }
        Insert: {
          business_name: string
          business_website: string
          contact_designation: string
          contact_email: string
          contact_name: string
          created_at?: string
          id?: string
          note: string
          unique_id: string
        }
        Update: {
          business_name?: string
          business_website?: string
          contact_designation?: string
          contact_email?: string
          contact_name?: string
          created_at?: string
          id?: string
          note?: string
          unique_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
