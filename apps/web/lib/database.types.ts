export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string | null
          created_by: string | null
          email: string | null
          id: string
          name: string
          picture_url: string | null
          public_data: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          name: string
          picture_url?: string | null
          public_data?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          name?: string
          picture_url?: string | null
          public_data?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      blog_post: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: number
          long_description: string | null
          short_description: string | null
          tags: string[] | null
          thumbnail: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          long_description?: string | null
          short_description?: string | null
          tags?: string[] | null
          thumbnail?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: number
          long_description?: string | null
          short_description?: string | null
          tags?: string[] | null
          thumbnail?: string | null
          title?: string
        }
        Relationships: []
      }
      booking: {
        Row: {
          account_id: string | null
          booking_date: string | null
          booking_status:
            | Database["public"]["Enums"]["booking_status_enum"]
            | null
          check_in_date: string
          check_out_date: string
          discount: number | null
          gross_total: number | null
          guest_email: string | null
          guest_full_name: string | null
          guest_phone: string | null
          hotel_slug: string | null
          id: string
          net_total: number | null
          nights: number | null
          number_of_rooms: number | null
          promocode: string | null
          room_id: number | null
          special_request: string | null
        }
        Insert: {
          account_id?: string | null
          booking_date?: string | null
          booking_status?:
            | Database["public"]["Enums"]["booking_status_enum"]
            | null
          check_in_date: string
          check_out_date: string
          discount?: number | null
          gross_total?: number | null
          guest_email?: string | null
          guest_full_name?: string | null
          guest_phone?: string | null
          hotel_slug?: string | null
          id?: string
          net_total?: number | null
          nights?: number | null
          number_of_rooms?: number | null
          promocode?: string | null
          room_id?: number | null
          special_request?: string | null
        }
        Update: {
          account_id?: string | null
          booking_date?: string | null
          booking_status?:
            | Database["public"]["Enums"]["booking_status_enum"]
            | null
          check_in_date?: string
          check_out_date?: string
          discount?: number | null
          gross_total?: number | null
          guest_email?: string | null
          guest_full_name?: string | null
          guest_phone?: string | null
          hotel_slug?: string | null
          id?: string
          net_total?: number | null
          nights?: number | null
          number_of_rooms?: number | null
          promocode?: string | null
          room_id?: number | null
          special_request?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "booking_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_hotel_slug_fkey"
            columns: ["hotel_slug"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "booking_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "hotel_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_detail: {
        Row: {
          booking_id: string | null
          discount: number | null
          gross_amount: number
          id: number
          includes_breakfast: boolean | null
          net_amount: number
          no_of_rooms: number | null
          room_id: number | null
          room_price: number
        }
        Insert: {
          booking_id?: string | null
          discount?: number | null
          gross_amount: number
          id?: number
          includes_breakfast?: boolean | null
          net_amount: number
          no_of_rooms?: number | null
          room_id?: number | null
          room_price: number
        }
        Update: {
          booking_id?: string | null
          discount?: number | null
          gross_amount?: number
          id?: number
          includes_breakfast?: boolean | null
          net_amount?: number
          no_of_rooms?: number | null
          room_id?: number | null
          room_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_detail_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "booking_detail_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "hotel_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      
      facility: {
        Row: {
          icon: string | null
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          icon?: string | null
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          icon?: string | null
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      hotel: {
        Row: {
          address: string | null
          class: number | null
          coordinates: unknown | null
          description: string | null
          distance_from_haram: number | null
          email: string | null
          id: string
          is_active: boolean | null
          is_best_hotel: boolean | null
          land_line: string | null
          latitude: number | null
          liscense_no: string | null
          location_slug: string | null
          longitude: number | null
          name: string
          payment_policies: string | null
          phone_number: string | null
          serve_breakfast: boolean | null
          slug: string | null
          terms: string | null
        }
        Insert: {
          address?: string | null
          class?: number | null
          coordinates?: unknown | null
          description?: string | null
          distance_from_haram?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_best_hotel?: boolean | null
          land_line?: string | null
          latitude?: number | null
          liscense_no?: string | null
          location_slug?: string | null
          longitude?: number | null
          name: string
          payment_policies?: string | null
          phone_number?: string | null
          serve_breakfast?: boolean | null
          slug?: string | null
          terms?: string | null
        }
        Update: {
          address?: string | null
          class?: number | null
          coordinates?: unknown | null
          description?: string | null
          distance_from_haram?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_best_hotel?: boolean | null
          land_line?: string | null
          latitude?: number | null
          liscense_no?: string | null
          location_slug?: string | null
          longitude?: number | null
          name?: string
          payment_policies?: string | null
          phone_number?: string | null
          serve_breakfast?: boolean | null
          slug?: string | null
          terms?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_location_slug_fkey"
            columns: ["location_slug"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["slug"]
          },
        ]
      }
      hotel_facility: {
        Row: {
          facility_id: number
          hotel_id: string
        }
        Insert: {
          facility_id: number
          hotel_id: string
        }
        Update: {
          facility_id?: number
          hotel_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_facility_facility_id_fkey"
            columns: ["facility_id"]
            isOneToOne: false
            referencedRelation: "facility"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotel_facility_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_images: {
        Row: {
          description: string | null
          hotel_slug: string | null
          id: number
          sort_order: number | null
          url: string
        }
        Insert: {
          description?: string | null
          hotel_slug?: string | null
          id?: number
          sort_order?: number | null
          url: string
        }
        Update: {
          description?: string | null
          hotel_slug?: string | null
          id?: number
          sort_order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_images_hotel_slug_fkey"
            columns: ["hotel_slug"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["slug"]
          },
        ]
      }
      hotel_rooms: {
        Row: {
          beds: number | null
          city_view: boolean | null
          description: string | null
          hotel_slug: string | null
          id: number
          name: string | null
          price_per_night: number
          price_per_night_with_breakfast: number | null
          room_category_id: number | null
          room_number: string
          status: Database["public"]["Enums"]["room_status_enum"] | null
        }
        Insert: {
          beds?: number | null
          city_view?: boolean | null
          description?: string | null
          hotel_slug?: string | null
          id?: number
          name?: string | null
          price_per_night: number
          price_per_night_with_breakfast?: number | null
          room_category_id?: number | null
          room_number: string
          status?: Database["public"]["Enums"]["room_status_enum"] | null
        }
        Update: {
          beds?: number | null
          city_view?: boolean | null
          description?: string | null
          hotel_slug?: string | null
          id?: number
          name?: string | null
          price_per_night?: number
          price_per_night_with_breakfast?: number | null
          room_category_id?: number | null
          room_number?: string
          status?: Database["public"]["Enums"]["room_status_enum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "hotel_rooms_hotel_slug_fkey"
            columns: ["hotel_slug"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "hotel_rooms_room_category_id_fkey"
            columns: ["room_category_id"]
            isOneToOne: false
            referencedRelation: "room_category"
            referencedColumns: ["id"]
          },
        ]
      }
      location: {
        Row: {
          id: string
          name: string
          slug: string | null
          thumbnail: string | null
        }
        Insert: {
          id?: string
          name: string
          slug?: string | null
          thumbnail?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string | null
          thumbnail?: string | null
        }
        Relationships: []
      }
      payment: {
        Row: {
          amount: number
          booking_id: string | null
          id: number
          payment_date: string | null
          payment_method:
            | Database["public"]["Enums"]["payment_method_enum"]
            | null
          payment_status:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          id?: number
          payment_date?: string | null
          payment_method?:
            | Database["public"]["Enums"]["payment_method_enum"]
            | null
          payment_status?:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          id?: number
          payment_date?: string | null
          payment_method?:
            | Database["public"]["Enums"]["payment_method_enum"]
            | null
          payment_status?:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["id"]
          },
        ]
      }
      promotion: {
        Row: {
          code: string
          description: string | null
          discount_percent: number | null
          hotel_id: string
          is_active: boolean | null
          valid_from: string | null
          valid_to: string | null
        }
        Insert: {
          code: string
          description?: string | null
          discount_percent?: number | null
          hotel_id: string
          is_active?: boolean | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Update: {
          code?: string
          description?: string | null
          discount_percent?: number | null
          hotel_id?: string
          is_active?: boolean | null
          valid_from?: string | null
          valid_to?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotion_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["id"]
          },
        ]
      }
      review: {
        Row: {
          booking_id: string | null
          feedback: string | null
          hotel_id: string | null
          id: number
          overall_rating: number | null
          reviewer_email: string | null
          reviewer_name: string
        }
        Insert: {
          booking_id?: string | null
          feedback?: string | null
          hotel_id?: string | null
          id?: number
          overall_rating?: number | null
          reviewer_email?: string | null
          reviewer_name: string
        }
        Update: {
          booking_id?: string | null
          feedback?: string | null
          hotel_id?: string | null
          id?: number
          overall_rating?: number | null
          reviewer_email?: string | null
          reviewer_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "review_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "booking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "review_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotel"
            referencedColumns: ["id"]
          },
        ]
      }
      review_detail_rating: {
        Row: {
          id: number
          rating: number | null
          review_id: number | null
          service: Database["public"]["Enums"]["service_rating_category"]
        }
        Insert: {
          id?: number
          rating?: number | null
          review_id?: number | null
          service: Database["public"]["Enums"]["service_rating_category"]
        }
        Update: {
          id?: number
          rating?: number | null
          review_id?: number | null
          service?: Database["public"]["Enums"]["service_rating_category"]
        }
        Relationships: [
          {
            foreignKeyName: "review_detail_rating_review_id_fkey"
            columns: ["review_id"]
            isOneToOne: false
            referencedRelation: "review"
            referencedColumns: ["id"]
          },
        ]
      }
      room_category: {
        Row: {
          id: number
          name: string
          slug: string | null
        }
        Insert: {
          id?: number
          name: string
          slug?: string | null
        }
        Update: {
          id?: number
          name?: string
          slug?: string | null
        }
        Relationships: []
      }
      room_images: {
        Row: {
          id: number
          room_id: number | null
          url: string
        }
        Insert: {
          id?: number
          room_id?: number | null
          url: string
        }
        Update: {
          id?: number
          room_id?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_images_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "hotel_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      search_log: {
        Row: {
          check_in_date: string | null
          check_out_date: string | null
          id: number
          location_id: string | null
          promocode: string | null
          search_datetime: string | null
          user_id: string | null
        }
        Insert: {
          check_in_date?: string | null
          check_out_date?: string | null
          id?: number
          location_id?: string | null
          promocode?: string | null
          search_datetime?: string | null
          user_id?: string | null
        }
        Update: {
          check_in_date?: string | null
          check_out_date?: string | null
          id?: number
          location_id?: string | null
          promocode?: string | null
          search_datetime?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "search_log_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "search_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      booking_status_enum:
        | "PENDING"
        | "CONFIRMED"
        | "CANCELLED"
        | "CHECKED_IN"
        | "COMPLETED"
      payment_method_enum: "MASTER" | "VISA" | "MADA" | "APPLE_PAY"
      payment_status_enum: "PENDING" | "COMPLETED" | "FAILED"
      room_status_enum: "AVAILABLE" | "OCCUPIED" | "MAINTENANCE"
      service_rating_category:
        | "CLEANLINESS"
        | "STAFF"
        | "FOOD"
        | "VALUE_FOR_MONEY"
        | "COMFORT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string | null
        }
        Relationships: []
      }
      buckets_analytics: {
        Row: {
          created_at: string
          deleted_at: string | null
          format: string
          id: string
          name: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          deleted_at?: string | null
          format?: string
          id?: string
          name?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      buckets_vectors: {
        Row: {
          created_at: string
          id: string
          type: Database["storage"]["Enums"]["buckettype"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          type?: Database["storage"]["Enums"]["buckettype"]
          updated_at?: string
        }
        Relationships: []
      }
      iceberg_namespaces: {
        Row: {
          bucket_name: string
          catalog_id: string
          created_at: string
          id: string
          metadata: Json
          name: string
          updated_at: string
        }
        Insert: {
          bucket_name: string
          catalog_id: string
          created_at?: string
          id?: string
          metadata?: Json
          name: string
          updated_at?: string
        }
        Update: {
          bucket_name?: string
          catalog_id?: string
          created_at?: string
          id?: string
          metadata?: Json
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "iceberg_namespaces_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "buckets_analytics"
            referencedColumns: ["id"]
          },
        ]
      }
      iceberg_tables: {
        Row: {
          bucket_name: string
          catalog_id: string
          created_at: string
          id: string
          location: string
          name: string
          namespace_id: string
          remote_table_id: string | null
          shard_id: string | null
          shard_key: string | null
          updated_at: string
        }
        Insert: {
          bucket_name: string
          catalog_id: string
          created_at?: string
          id?: string
          location: string
          name: string
          namespace_id: string
          remote_table_id?: string | null
          shard_id?: string | null
          shard_key?: string | null
          updated_at?: string
        }
        Update: {
          bucket_name?: string
          catalog_id?: string
          created_at?: string
          id?: string
          location?: string
          name?: string
          namespace_id?: string
          remote_table_id?: string | null
          shard_id?: string | null
          shard_key?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "iceberg_tables_catalog_id_fkey"
            columns: ["catalog_id"]
            isOneToOne: false
            referencedRelation: "buckets_analytics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "iceberg_tables_namespace_id_fkey"
            columns: ["namespace_id"]
            isOneToOne: false
            referencedRelation: "iceberg_namespaces"
            referencedColumns: ["id"]
          },
        ]
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      vector_indexes: {
        Row: {
          bucket_id: string
          created_at: string
          data_type: string
          dimension: number
          distance_metric: string
          id: string
          metadata_configuration: Json | null
          name: string
          updated_at: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          data_type: string
          dimension: number
          distance_metric: string
          id?: string
          metadata_configuration?: Json | null
          name: string
          updated_at?: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          data_type?: string
          dimension?: number
          distance_metric?: string
          id?: string
          metadata_configuration?: Json | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vector_indexes_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets_vectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: { bucketid: string; metadata: Json; name: string; owner: string }
        Returns: undefined
      }
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_common_prefix: {
        Args: { p_delimiter: string; p_key: string; p_prefix: string }
        Returns: string
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          bucket_id: string
          size: number
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
          prefix_param: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          _bucket_id: string
          delimiter_param: string
          max_keys?: number
          next_token?: string
          prefix_param: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          bucketname: string
          levels?: number
          limits?: number
          offsets?: number
          prefix: string
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          created_at: string
          id: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_by_timestamp: {
        Args: {
          p_bucket_id: string
          p_level: number
          p_limit: number
          p_prefix: string
          p_sort_column: string
          p_sort_column_after: string
          p_sort_order: string
          p_start_after: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
      search_v2: {
        Args: {
          bucket_name: string
          levels?: number
          limits?: number
          prefix: string
          sort_column?: string
          sort_column_after?: string
          sort_order?: string
          start_after?: string
        }
        Returns: {
          created_at: string
          id: string
          key: string
          last_accessed_at: string
          metadata: Json
          name: string
          updated_at: string
        }[]
      }
    }
    Enums: {
      buckettype: "STANDARD" | "ANALYTICS" | "VECTOR"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      booking_status_enum: [
        "PENDING",
        "CONFIRMED",
        "CANCELLED",
        "CHECKED_IN",
        "COMPLETED",
      ],
      payment_method_enum: ["MASTER", "VISA", "MADA", "APPLE_PAY"],
      payment_status_enum: ["PENDING", "COMPLETED", "FAILED"],
      room_status_enum: ["AVAILABLE", "OCCUPIED", "MAINTENANCE"],
      service_rating_category: [
        "CLEANLINESS",
        "STAFF",
        "FOOD",
        "VALUE_FOR_MONEY",
        "COMFORT",
      ],
    },
  },
  storage: {
    Enums: {
      buckettype: ["STANDARD", "ANALYTICS", "VECTOR"],
    },
  },
} as const

