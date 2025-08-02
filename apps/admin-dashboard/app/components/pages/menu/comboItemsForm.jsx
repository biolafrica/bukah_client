import { ImageUploadField } from '../../common/imageUploadField'
import { useMenuOptions } from '../../../hooks/useMenuOption'

import React, { useState,} from 'react'
import { PlusIcon, PencilIcon, TrashIcon as DeleteIcon } from '@heroicons/react/24/outline'

export default function ComboItemForm({
  onSubmit
}) {

  // Section 1 state
  const [imageFile,   setImageFile]   = useState(null)
  const [name,        setName]        = useState('')
  const [description, setDescription] = useState('')
  const [basePrice,   setBasePrice]   = useState('')
  const [branch,      setBranch]      = useState('')
  const [category,    setCategory]    = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [ingredient,  setIngredient]  = useState('')

  // Section 2: components
  const [components, setComponents] = useState([])
  const [editing, setEditing] = useState(null)


  const { branchOptions, categoryOptions, singleItemOptions, loading, error } = useMenuOptions()
  if (error)  return <p>Error: {error.message}</p>

  // Helpers for components
  function startAddComponent() {
    // collapse any editing
    setEditing({
      id: Date.now(),
      name: '', required: false,
      min: 1, max: 1,
      options: []
    })
  }

  function saveComponent() {
    if (editing.min > editing.max) {
      alert('Minimum cannot exceed Maximum')
      return
    }
    setComponents(prev => [...prev, editing])
    setEditing(null)
  }

  function editComponent(comp) {
    setEditing(comp)
    setComponents(prev => prev.filter(c => c.id !== comp.id))
  }

  function deleteComponent(id) {
    setComponents(prev => prev.filter(c => c.id !== id))
  }

  // Option handlers
  function addOption() {
    setEditing(editing => ({
      ...editing,
      options: [...editing.options, { id: Date.now(), item: '', price: '' }]
    }))
  }

  function updateOption(idx, key, val) {
    setEditing(editing => ({
      ...editing,
      options: editing.options.map((opt,i) => i===idx ? { ...opt, [key]: val } : opt)
    }))
  }

  function deleteOption(idx) {
    setEditing(editing => ({
      ...editing,
      options: editing.options.filter((_,i) => i!==idx)
    }))
  }

  // Final submit
  function handleSubmit(e) {
    e.preventDefault()
    const payload = {
      image_url: imageFile,
      name,
      description,
      price: basePrice,
      branch_id : branch, 
      category_id : category,
      preparation_time:cookingTime, 
      ingredient,
      components
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow">

      {/* Section 1 */}
      <div className="space-y-4 ">

        <ImageUploadField
          name="comboImage"
          value={imageFile}
          onChange={setImageFile}
          requirementText="JPG or PNG, max 2MB, square"
        />

        <label htmlFor="name" className='font-medium text-sm'>Item Name</label>
        <input
          type="text" placeholder="Item Name"
          value={name} onChange={e=>setName(e.target.value)}
          className="input w-full"
          required
        />

        <label htmlFor="description" className='font-medium text-sm'>Description</label>
        <textarea
          placeholder="Description"
          value={description} onChange={e=>setDescription(e.target.value)}
          rows={3}
          className="input resize-none w-full"
          required
        />

        <label htmlFor="basePrice" className='font-medium text-sm'>Base Price</label>
        <input
          type="number" placeholder="Base Price"
          value={basePrice} onChange={e=>setBasePrice(e.target.value)}
          className="input w-full"
          required
        />

        <label htmlFor="branch" className='font-medium text-sm'>Branches</label>
        <select
          value={branch} onChange={e=>setBranch(e.target.value)}
          className="input w-full"
          required
        >
          <option value="">Choose Branch</option>
          {branchOptions.map(b=>(
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>

        <label htmlFor="category" className='font-medium text-sm'>Choose Category</label>
        <select
          value={category} onChange={e=>setCategory(e.target.value)}
          className="input w-full"
          required
        >
          <option value="">Choose Category</option>
          {categoryOptions.map(c=>(
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <label htmlFor="cookingTime" className='font-medium text-sm'>Cooking Time</label> 
        <input
          type="number" placeholder="Cooking Time (mins)"
          value={cookingTime} onChange={e=>setCookingTime(e.target.value)}
          className="input w-full"
          required
        />

        <label htmlFor="ingredient" className='font-medium text-sm'>Ingredients</label> 
        <input
          type="text" placeholder="Ingredients"
          value={ingredient} onChange={e=>setIngredient(e.target.value)}
          className="input w-full"
        />

      </div>

      {/* Section 2: Components */}
      <div className="border-b border-border-text pb-2 mb-4 flex justify-between items-center">

        <h4 className="font-semibold">Components</h4>
        <button type="button" onClick={startAddComponent} className="btn btn-tonal flex items-center gap-1">
          <PlusIcon className="w-4 h-4"/> Add Component
        </button>

      </div>

      {editing ? (
        <div className="p-4 border border-border-text rounded-lg mb-4 space-y-4">

          <div className="flex justify-between items-center">
            <h5 className="font-medium">New Component</h5>
            <button type="button" onClick={()=>setEditing(null)}><DeleteIcon className="w-5 h-5 text-red-600"/></button>
          </div>

          <div className="flex gap-4">
            <input
              type="text" placeholder="Component Name"
              value={editing.name} onChange={e=>setEditing({...editing, name:e.target.value})}
              className="input flex-1"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.required}
                onChange={e=>setEditing({...editing, required:e.target.checked})}
              /> Required
            </label>
          </div>

          <div className="flex gap-4">
            <input
              type="number" placeholder="Min"
              value={editing.min} onChange={e=>setEditing({...editing, min:+e.target.value})}
              className="input w-1/2"
            />
            <input
              type="number" placeholder="Max"
              value={editing.max} onChange={e=>setEditing({...editing, max:+e.target.value})}
              className="input w-1/2"
            />
          </div>

          {/* Options subsection */}
          <div className="border-t border-border-text pt-2">

            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Options</h5>
              <button type="button" onClick={addOption} className="btn btn-tonal flex items-center gap-1">
                <PlusIcon className="w-4 h-4"/> Add Option
              </button>
            </div>

            {editing.options.map((opt, idx)=>(
              <div key={opt.id} className="flex gap-4 items-center mb-2">

                <select
                  value={opt.item}
                  onChange={e=>updateOption(idx,'item',e.target.value)}
                  className="input flex-1"
                >
                  <option value="">Choose Item</option>
                  {singleItemOptions.map(si=>(
                    <option key={si.value} value={si.value}>{si.label}</option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Price"
                  value={opt.price}
                  onChange={e=>updateOption(idx,'price',e.target.value)}
                  className="input w-32"
                />

                <button type="button" onClick={()=>deleteOption(idx)}><DeleteIcon className="w-5 h-5 text-red-600"/></button>

              </div>
            ))}
          </div>

          <button type="button" onClick={saveComponent} className="btn btn-filled mt-4">
            Save Component
          </button>

        </div>
      ) : (
        components.map(comp => (
          <div key={comp.id} className="p-4 border border-border-text bg-laybg-text rounded-lg mb-4 flex justify-between items-center">

            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-medium">{comp.name}</h5>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${comp.required ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {comp.required ? 'Required' : 'Optional'}
                </span>
              </div>
              <p className="text-sm">Min: {comp.min} – Max: {comp.max}</p>
            </div>

            <div className="flex gap-2">
              <button type="button" onClick={()=>editComponent(comp)}><PencilIcon className="w-5 h-5 text-gray-600"/></button>
              <button type="button" onClick={()=>deleteComponent(comp.id)}><DeleteIcon className="w-5 h-5 text-red-600"/></button>
            </div>
            
          </div>
        ))
      )}

      {/* Final submit */}
      <button type="submit" className="btn btn-filled w-full text-center">
        Add Combo
      </button>
    </form>
  )
}