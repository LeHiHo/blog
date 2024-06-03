import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { content } = await request.json();
  console.log(content);

  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('test')
      .insert([{ content, created_at: new Date().toISOString() }]);

    if (error) {
      throw error;
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error inserting content:', error);
    return NextResponse.json(
      { error: 'Failed to insert content' },
      { status: 500 },
    );
  }
}

export function OPTIONS() {
  return NextResponse.json({ allow: ['POST'] }, { status: 200 });
}
