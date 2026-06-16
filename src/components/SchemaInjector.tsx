import React from 'react';

interface SchemaInjectorProps {
  schema: Record<string, any>;
}

export default function SchemaInjector({ schema }: SchemaInjectorProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
