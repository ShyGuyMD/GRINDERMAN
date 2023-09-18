export interface WordPressImageResponse {
    alt_text: string;
    author: number;
    caption: {
      raw: string;
      rendered: string;
    };
    comment_status: string;
    date: string;
    date_gmt: string;
    description: {
      raw: string;
      rendered: string;
    };
    generated_slug: string;
    guid: {
      rendered: string;
      raw: string;
    };
    id: number;
    link: string;
    media_details: {
      width: number;
      height: number;
      file: string;
      filesize: number;
      sizes: any; // Define the structure for sizes data
    };
    media_type: string;
    meta: any[]; // Define the structure for meta data
    mime_type: string;
    missing_image_sizes: any[]; // Define the structure for missing_image_sizes data
    modified: string;
    modified_gmt: string;
    permalink_template: string;
    ping_status: string;
    post: any; // Define the structure for post data
    slug: string;
    source_url: string;
    status: string;
    template: string;
    title: {
      raw: string;
      rendered: string;
    };
    type: string;
  }