import { ImageUploadField } from '../../common/imageUploadField'
import { useMenuOptions } from '../../../hooks/useMenuOption'

import React, { useState } from 'react'
import { PlusIcon, PencilIcon, TrashIcon as DeleteIcon } from '@heroicons/react/24/outline'

export default function ComboItemForm({ onSubmit, initialValue, setErrorMsg }) {

  // Section 1 state — aligned with DB keys
  const [image_url, setImageFile] = useState(initialValue?.image_url || null)
  const [name, setName] = useState(initialValue?.name || '')
  const [description, setDescription] = useState(initialValue?.description || '')
  const [price, setPrice] = useState(initialValue?.price || '')
  const [branch_id, setBranchId] = useState(initialValue?.branch_id || '')
  const [category_id, setCategoryId] = useState(initialValue?.category_id || '')
  const [preparation_time, setPreparationTime] = useState(initialValue?.preparation_time || '')
  const [ingredient, setIngredient] = useState(initialValue?.ingredient || '')

  // Components
  const [components, setComponents] = useState(initialValue?.components || [])
  const [editing, setEditing] = useState(null)

  const { branchOptions, categoryOptions, singleItemOptions, loading, error } = useMenuOptions()
  if (error) return <p>Error: {error.message}</p>

  function startAddComponent() {
    setEditing({
      id: Date.now(),
      name: '',
      required: false,
      min_selection: 1,
      max_selection: 1,
      options: []
    })
  }

  function saveComponent() {
    if (editing.min_selection > editing.max_selection) {
      alert('Minimum cannot exceed Maximum')
      return
    }
    setComponents(prev => [...prev, editing])
    setEditing(null)
  }

  function editComponent(comp) {
    setEditing({
      ...comp,
      options: comp.options || []
    })
    setComponents(prev => prev.filter(c => c.id !== comp.id))
  }

  function deleteComponent(id) {
    setComponents(prev => prev.filter(c => c.id !== id))
  }

  // Option handlers
  function addOption() {
    setEditing(editing => ({
      ...editing,
      options: [...editing.options, { id: Date.now(), product_id: '', extra_charges: '' }]
    }))
  }

  function updateOption(idx, key, val) {
    setEditing(editing => ({
      ...editing,
      options: editing.options.map((opt, i) => i === idx ? { ...opt, [key]: val } : opt)
    }))
  }

  function deleteOption(idx) {
    setEditing(editing => ({
      ...editing,
      options: editing.options.filter((_, i) => i !== idx)
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    if (!image_url) {
      setErrorMsg("Please upload an image for the combo item.")
      return
    }

    if (components.length === 0) {
      setErrorMsg("Please add at least one component.")
      return
    }

    for (const comp of components) {
      if (!comp.options || comp.options.length === 0) {
        setErrorMsg(`Component "${comp.name || 'Unnamed'}" must have at least one option.`)
        return
      }

      if (comp.options.length < comp.min) {
        setErrorMsg(`Component "${comp.name || 'Unnamed'}" has fewer options than the minimum required (${comp.min}).`)
        return
      }

      if (comp.options.length > comp.max) {
        setErrorMsg(`Component "${comp.name || 'Unnamed'}" has more options than the maximum allowed (${comp.max}).`)
        return
      }
    }

    const payload = {
      image_url,
      name,
      description,
      price,
      branch_id,
      category_id,
      preparation_time,
      ingredient,
      components
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">

      {/* Section 1 */}
      <div className="space-y-4">
        <ImageUploadField
          name="comboImage"
          value={image_url}
          onChange={setImageFile}
          requirementText="JPG or PNG, max 2MB, square"
        />

        <label className="font-medium text-sm">Item Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="input w-full" required />

        <label className="font-medium text-sm">Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="input w-full" required />

        <label className="font-medium text-sm">Base Price</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="input w-full" required />

        <label className="font-medium text-sm">Branches</label>
        <select value={branch_id} onChange={e => setBranchId(e.target.value)} className="input w-full" required>
          <option value="">Choose Branch</option>
          {branchOptions.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>

        <label className="font-medium text-sm">Choose Category</label>
        <select value={category_id} onChange={e => setCategoryId(e.target.value)} className="input w-full" required>
          <option value="">Choose Category</option>
          {categoryOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        <label className="font-medium text-sm">Cooking Time</label>
        <input type="number" value={preparation_time} onChange={e => setPreparationTime(e.target.value)} className="input w-full" required />

        <label className="font-medium text-sm">Ingredients</label>
        <input type="text" value={ingredient} onChange={e => setIngredient(e.target.value)} className="input w-full" />
      </div>

      {/* Section 2: Components */}
      <div className="border-b border-border-text pb-2 mb-4 flex justify-between items-center">
        <h4 className="font-semibold">Components</h4>
        <button type="button" onClick={startAddComponent} className="btn btn-tonal flex items-center gap-1">
          <PlusIcon className="w-4 h-4" /> Add Component
        </button>
      </div>

      {editing ? (
        <div className="p-4 border rounded-lg mb-4 space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="font-medium">New Component</h5>
            <button type="button" onClick={() => setEditing(null)}><DeleteIcon className="w-5 h-5 text-red-600" /></button>
          </div>

          <input type="text" value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })} className="input w-full" placeholder="Component Name" />

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={editing.required} onChange={e => setEditing({ ...editing, required: e.target.checked })} /> Required
          </label>

          <div className="flex gap-4">
            <input type="number" value={editing.min_selection} onChange={e => setEditing({ ...editing, min_selection: +e.target.value })} className="input w-1/2" placeholder="Min" />
            <input type="number" value={editing.max_selection} onChange={e => setEditing({ ...editing, max_selection: +e.target.value })} className="input w-1/2" placeholder="Max" />
          </div>

          <div className="border-t pt-2">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Options</h5>
              <button type="button" onClick={addOption} className="btn btn-tonal flex items-center gap-1">
                <PlusIcon className="w-4 h-4" /> Add Option
              </button>
            </div>

            {(editing?.options || []).map((opt, idx) => (
              <div key={opt.id} className="flex gap-4 items-center mb-2">
                <select value={opt.product_id} onChange={e => updateOption(idx, 'product_id', e.target.value)} className="input flex-1">
                  <option value="">Choose Item</option>
                  {singleItemOptions.map(si => <option key={si.value} value={si.value}>{si.label}</option>)}
                </select>

                <input type="number" value={opt.extra_charges || ""} onChange={e => updateOption(idx, 'extra_charges', e.target.value)} className="input w-32" placeholder="Extra Charges" />

                <button type="button" onClick={() => deleteOption(idx)}><DeleteIcon className="w-5 h-5 text-red-600" /></button>
              </div>
            ))}
          </div>

          <button type="button" onClick={saveComponent} className="btn btn-filled mt-4">Save Component</button>
        </div>
      ) : (
        components.map(comp => (
          <div key={comp.id} className="p-4 border bg-laybg-text rounded-lg mb-4 flex justify-between items-center">
            <div>
              <h5 className="font-medium">{comp.name}</h5>
              <span className={`text-xs font-medium px-2 py-0.5 rounded ${comp.required ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {comp.required ? 'Required' : 'Optional'}
              </span>
              <p className="text-sm">Min: {comp.min_selection} – Max: {comp.max_selection}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => editComponent(comp)}><PencilIcon className="w-5 h-5 text-gray-600" /></button>
              <button onClick={() => deleteComponent(comp.id)}><DeleteIcon className="w-5 h-5 text-red-600" /></button>
            </div>
          </div>
        ))
      )}

      <button type="submit" className="btn btn-filled w-full text-center">Add Combo</button>
    </form>
  )
}
