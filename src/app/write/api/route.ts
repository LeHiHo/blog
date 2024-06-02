import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { title, summary, content, tags } = await request.json();

  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from('test')
      .insert([
        { title, summary, content, tags, created_at: new Date().toISOString() },
      ]);

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
