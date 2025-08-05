import { handleServerError } from '../../../../../src/lib/errorHandler'
import { supabase } from '../../../../../../../packages/utils/database/supabaseClient'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    const {comboId} = await params

    const { data, error } = await supabase.rpc('get_combo_product_details', { combo_id: comboId })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data, { status: 200 })

  } catch (err) {
    handleServerError(err, "error fetching combo product")
  }
}

export async function PUT(request, { params }) {
  try {
    const {comboId} = await params
    const body = await request.json();

    const payload = {
      ...body,
      id: comboId,
    };

    const {error } = await supabase.rpc('update_combo_product', {payload})

    if (error) {
      console.log(error)
      return NextResponse.json({ error: error.message },{ status: 400 })
    }

    return NextResponse.json({ message: "Combo product updated successfully" },{ status: 200 })

  } catch (err) {
    handleServerError(err, "error updating combo product")
  }
}
