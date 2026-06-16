import React from 'react';

interface SchemaInjectorProps {
  schema: Record<string, any>;
  nonce?: string;
}

export default function SchemaInjector({ schema, nonce }: SchemaInjectorProps) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
