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
      assignments: {
        Row: {
          assigned_date: string
          attachments: string[] | null
          classes: string[] | null
          created_at: string
          description: string | null
          due_date: string
          id: string
          max_score: number | null
          school_id: string
          status: string | null
          subject_id: string
          teacher_id: string
          title: string
          updated_at: string
        }
        Insert: {
          assigned_date?: string
          attachments?: string[] | null
          classes?: string[] | null
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          max_score?: number | null
          school_id: string
          status?: string | null
          subject_id: string
          teacher_id: string
          title: string
          updated_at?: string
        }
        Update: {
          assigned_date?: string
          attachments?: string[] | null
          classes?: string[] | null
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          max_score?: number | null
          school_id?: string
          status?: string | null
          subject_id?: string
          teacher_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assignments_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      behaviors: {
        Row: {
          category: string
          created_at: string
          date: string | null
          id: string
          max_score: number
          notes: string | null
          reported_by: string | null
          school_id: string
          score: number
          student_id: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          date?: string | null
          id?: string
          max_score?: number
          notes?: string | null
          reported_by?: string | null
          school_id: string
          score: number
          student_id: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          date?: string | null
          id?: string
          max_score?: number
          notes?: string | null
          reported_by?: string | null
          school_id?: string
          score?: number
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "behaviors_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "behaviors_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          academic_year: string | null
          created_at: string
          grade_level: string | null
          id: string
          name: string
          school_id: string
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          academic_year?: string | null
          created_at?: string
          grade_level?: string | null
          id?: string
          name: string
          school_id: string
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          academic_year?: string | null
          created_at?: string
          grade_level?: string | null
          id?: string
          name?: string
          school_id?: string
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          amount: number
          created_at: string
          description: string
          id: string
          invoice_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description: string
          id?: string
          invoice_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string
          id?: string
          invoice_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          amount: number
          created_at: string
          due_date: string
          id: string
          invoice_number: string
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          school_id: string
          status: string | null
          student_id: string
          term: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          due_date: string
          id?: string
          invoice_number: string
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          school_id: string
          status?: string | null
          student_id: string
          term: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          due_date?: string
          id?: string
          invoice_number?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          school_id?: string
          status?: string | null
          student_id?: string
          term?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      marks: {
        Row: {
          comments: string | null
          created_at: string
          date: string | null
          exam_type: string
          grade: string | null
          id: string
          marks_obtained: number
          school_id: string
          semester: string | null
          student_id: string
          subject_id: string
          total_marks: number
          updated_at: string
        }
        Insert: {
          comments?: string | null
          created_at?: string
          date?: string | null
          exam_type: string
          grade?: string | null
          id?: string
          marks_obtained: number
          school_id: string
          semester?: string | null
          student_id: string
          subject_id: string
          total_marks?: number
          updated_at?: string
        }
        Update: {
          comments?: string | null
          created_at?: string
          date?: string | null
          exam_type?: string
          grade?: string | null
          id?: string
          marks_obtained?: number
          school_id?: string
          semester?: string | null
          student_id?: string
          subject_id?: string
          total_marks?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          profile_image: string | null
          role: Database["public"]["Enums"]["user_role"]
          school_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id: string
          last_name?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          profile_image?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          school_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      schools: {
        Row: {
          address: string | null
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          name: string
          phone: string | null
          subdomain: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          phone?: string | null
          subdomain: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          phone?: string | null
          subdomain?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          admission_date: string | null
          allergies: string[] | null
          attendance_percentage: number | null
          behavior_score: number | null
          blood_group: string | null
          class_id: string | null
          created_at: string
          date_of_birth: string | null
          emergency_contact: string | null
          gender: string | null
          guardian_contact: string | null
          guardian_name: string | null
          hobbies: string[] | null
          id: string
          medical_conditions: string[] | null
          nationality: string | null
          phone_number: string | null
          religion: string | null
          roll_number: string
          school_id: string
          status: string | null
          transport_route: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          admission_date?: string | null
          allergies?: string[] | null
          attendance_percentage?: number | null
          behavior_score?: number | null
          blood_group?: string | null
          class_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: string | null
          gender?: string | null
          guardian_contact?: string | null
          guardian_name?: string | null
          hobbies?: string[] | null
          id?: string
          medical_conditions?: string[] | null
          nationality?: string | null
          phone_number?: string | null
          religion?: string | null
          roll_number: string
          school_id: string
          status?: string | null
          transport_route?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          admission_date?: string | null
          allergies?: string[] | null
          attendance_percentage?: number | null
          behavior_score?: number | null
          blood_group?: string | null
          class_id?: string | null
          created_at?: string
          date_of_birth?: string | null
          emergency_contact?: string | null
          gender?: string | null
          guardian_contact?: string | null
          guardian_name?: string | null
          hobbies?: string[] | null
          id?: string
          medical_conditions?: string[] | null
          nationality?: string | null
          phone_number?: string | null
          religion?: string | null
          roll_number?: string
          school_id?: string
          status?: string | null
          transport_route?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subject_class: {
        Row: {
          class_id: string
          created_at: string
          id: string
          subject_id: string
          updated_at: string
        }
        Insert: {
          class_id: string
          created_at?: string
          id?: string
          subject_id: string
          updated_at?: string
        }
        Update: {
          class_id?: string
          created_at?: string
          id?: string
          subject_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subject_class_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subject_class_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          code: string
          created_at: string
          credits: number | null
          description: string | null
          duration: string | null
          id: string
          name: string
          schedule: string | null
          school_id: string
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          credits?: number | null
          description?: string | null
          duration?: string | null
          id?: string
          name: string
          schedule?: string | null
          school_id: string
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          credits?: number | null
          description?: string | null
          duration?: string | null
          id?: string
          name?: string
          schedule?: string | null
          school_id?: string
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          address: string | null
          bank_account: string | null
          created_at: string
          department: string | null
          emergency_contact: string | null
          employee_id: string | null
          id: string
          join_date: string | null
          phone_number: string | null
          qualification: string | null
          school_id: string
          specialization: string[] | null
          status: string | null
          subjects: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          bank_account?: string | null
          created_at?: string
          department?: string | null
          emergency_contact?: string | null
          employee_id?: string | null
          id?: string
          join_date?: string | null
          phone_number?: string | null
          qualification?: string | null
          school_id: string
          specialization?: string[] | null
          status?: string | null
          subjects?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          bank_account?: string | null
          created_at?: string
          department?: string | null
          emergency_contact?: string | null
          employee_id?: string | null
          id?: string
          join_date?: string | null
          phone_number?: string | null
          qualification?: string | null
          school_id?: string
          specialization?: string[] | null
          status?: string | null
          subjects?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teachers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_user_school: {
        Args: { school_uuid: string }
        Returns: boolean
      }
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_user_school: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      user_role: "super_admin" | "school_admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["super_admin", "school_admin", "teacher", "student"],
    },
  },
} as const
