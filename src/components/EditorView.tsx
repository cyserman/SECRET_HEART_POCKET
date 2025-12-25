import { useState, useRef } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { Story } from '../types';
import { uploadImage } from '../lib/storage';
import { useAuth } from '../hooks/useAuth';

interface EditorViewProps {
  initialData?: Story | null;
  onSave: (data: Story) => void;
  onCancel: () => void;
  isGold?: boolean;
}

export const EditorView = ({ initialData, onSave, onCancel }: EditorViewProps) => {
  const { user } = useAuth();
  const [form, setForm] = useState<Story>(
    initialData || { 
      title: "New Story", 
      author: "Explorer",
      tagline: "",
      category: 'FAMILY',
      settings: { mps: 10, transition: 'fade', filter: 'none' }, 
      pages: [{ text: "", images: [] }] 
    }
  );
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveClick = () => {
    console.log("Save button clicked!", form);
    
    // Validate before saving (synchronous, fast)
    if (!form.title || form.title.trim() === '' || form.title === 'New Story') {
      alert("Please change the story title from 'New Story' to something meaningful.");
      return;
    }
    
    const hasContent = form.pages.some(page => 
      (page.text && page.text.trim() !== '') || 
      (page.images && page.images.length > 0)
    );
    
    if (!hasContent) {
      alert("Please add some text or photos to at least one page before saving.");
      return;
    }
    
    // Set saving state immediately (non-blocking UI update)
    setIsSaving(true);
    
    // Use requestIdleCallback to completely yield to browser before heavy operation
    const performSave = async () => {
      try {
        console.log("Calling onSave with:", form);
        await onSave(form);
        // onSave handles navigation, so isSaving will be reset by component unmount
      } catch (error: any) {
        console.error("Save error in EditorView:", error);
        alert(`Error: ${error?.message || 'Failed to save story'}`);
        setIsSaving(false);
      }
    };
    
    // Yield to browser completely - use double setTimeout to ensure browser can paint
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        setTimeout(performSave, 0);
      }, { timeout: 100 });
    } else {
      setTimeout(() => {
        setTimeout(performSave, 0);
      }, 50);
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    if (!user) {
      alert('Please wait for authentication to complete before uploading images.');
      return;
    }
    
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    ).slice(0, 10); // Limit to 10 images
    
    if (imageFiles.length === 0) {
      alert('Please drop image files only (JPG, PNG, WebP, etc.)');
      return;
    }

    // Upload to Firebase Storage
    try {
      setUploadProgress({ current: 0, total: imageFiles.length });
      const updatedPages = [...form.pages];
      
      // Upload images one at a time with progress tracking
      for (let i = 0; i < imageFiles.length; i++) {
        const result = await uploadImage(
          imageFiles[i],
          user.uid,
          form.id, // Story ID (if editing existing story)
          (progress) => {
            // Optional: Add per-file progress tracking
            console.log(`Upload ${i + 1}/${imageFiles.length}: ${progress.percent.toFixed(0)}%`);
          }
        );
        
        // Add uploaded image URL to current page
        updatedPages[active] = {
          ...updatedPages[active],
          images: [
            ...updatedPages[active].images,
            { url: result.url, path: result.path }
          ]
        };
        
        // Update form and progress
        setForm({ ...form, pages: updatedPages });
        setUploadProgress({ current: i + 1, total: imageFiles.length });
      }
      
      // Clear progress indicator
      setUploadProgress(null);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
      setUploadProgress(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="card-dark rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] pb-24">
      <div className="w-full md:w-72 glass-warm border-r border-white/10 p-6 space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block">
            Memories Per Story (MPS)
          </label>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={form.settings.mps} 
            onChange={e => setForm({
              ...form, 
              settings: {...form.settings, mps: parseInt(e.target.value)}
            })} 
            className="w-full accent-orange-500" 
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
            <span>Static</span>
            <span>Full Cycle ({form.settings.mps})</span>
          </div>
        </div>
        <div className="space-y-2">
          {form.pages.map((p, i) => (
            <div 
              key={i} 
              onClick={() => setActive(i)} 
            className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
              active === i 
                ? 'border-ember-400 glass-warm shadow-sm' 
                : 'border-transparent glass-warm opacity-60 hover:opacity-80'
            }`}
            >
              <div className="text-[10px] font-bold text-slate-400">Page {i+1}</div>
              <div className="text-xs truncate text-slate-300">{p.text || "..."}</div>
            </div>
          ))}
          <button 
            onClick={() => {
              const newPages = [...form.pages, { text: "", images: [] }];
              setForm({...form, pages: newPages});
              // Switch to new page immediately
              setTimeout(() => setActive(newPages.length - 1), 0);
            }} 
            className="w-full py-2 border-2 border-dashed border-white/20 rounded-xl text-ember-400 text-xs font-bold hover:border-ember-400/60 hover:bg-ember-400/10 active:scale-95 transition-all"
          >
            + Add Page
          </button>
        </div>
      </div>
      <div className="flex-1 p-8 space-y-6">
        <input 
          value={form.title} 
          onChange={e => setForm({...form, title: e.target.value})} 
          className="text-3xl font-black border-none focus:ring-0 w-full p-0 bg-transparent text-white placeholder-slate-600" 
          placeholder="Story Title" 
        />
        <div className="space-y-3">
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className={`h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
              isDragging 
                ? 'bg-ember-400/15 border-ember-400 border-solid glass-warm' 
                : 'glass-warm border-white/20 hover:border-ember-400/50 hover:bg-ember-400/5'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
              aria-hidden="true"
              tabIndex={-1}
            />
            <UploadCloud size={24} className={isDragging ? 'text-ember-400' : 'text-slate-400'} />
            <span className={`text-xs font-bold mt-1 ${isDragging ? 'text-ember-400' : 'text-slate-400'}`}>
              {isDragging ? 'Drop photos here' : 'Drag photos here'}
            </span>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 bg-gradient-to-r from-ember-400 to-ember-500 text-white font-bold rounded-xl shadow-lg shadow-ember-500/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <UploadCloud size={18} />
            Upload to Cloud Storage
          </button>
          {uploadProgress && (
            <div className="flex items-center gap-2 text-xs text-ember-400 bg-ember-400/10 p-3 rounded-lg border border-ember-400/20 glass-warm">
              <Loader2 size={16} className="animate-spin" />
              <span className="font-semibold">
                Uploading {uploadProgress.current} of {uploadProgress.total} image(s) to cloud storage...
              </span>
            </div>
          )}
          {!uploadProgress && form.pages[active]?.images?.length > 0 && (
            <div className="text-xs text-slate-400 bg-slate-800 p-3 rounded-lg border border-slate-700">
              Page {active + 1}: {form.pages[active].images.length} photo(s) uploaded to cloud ✓
            </div>
          )}
          {form.pages.map((page, idx) => idx !== active && page.images?.length > 0 && (
            <div key={`photo-hint-${idx}`} className="text-xs text-slate-400 italic">
              Page {idx + 1} has {page.images.length} photo(s)
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500">Story Text</label>
            </div>
            <button
              onClick={() => {
                const userPrompt = window.prompt('Describe your story or memory, and AI will help write it:');
                if (userPrompt) {
                  // Simple AI placeholder - in production, this would call an AI API
                  const aiText = `Once upon a time, ${userPrompt.toLowerCase()}. The memory was captured in this moment, forever preserved in this pocket of time.`;
                  let p = [...form.pages];
                  // APPEND to existing text instead of replacing
                  const currentText = p[active].text || '';
                  p[active].text = currentText 
                    ? `${currentText}\n\n${aiText}` 
                    : aiText;
                  setForm({...form, pages: p});
                }
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-ember-400/20 to-ember-500/20 text-ember-400 font-bold rounded-xl hover:from-ember-400/30 hover:to-ember-500/30 active:scale-95 transition-all border border-ember-400/30 flex items-center justify-center gap-2 glass-warm"
            >
              <span>✨</span>
              <span>AI Help - Add to Story</span>
            </button>
          </div>
          <textarea 
            key={`textarea-${active}`}
            value={form.pages[active]?.text || ''} 
            onChange={e => { 
              let p = [...form.pages]; 
              if (!p[active]) {
                p[active] = { text: "", images: [] };
              }
              p[active].text = e.target.value; 
              setForm({...form, pages: p}); 
            }} 
            onFocus={(e) => e.target.select()}
            className="w-full h-48 text-xl font-serif leading-relaxed border-2 border-white/15 rounded-xl p-4 glass-warm text-slate-100 focus:ring-2 focus:ring-ember-400 focus:border-ember-400 resize-none placeholder:text-slate-400" 
            placeholder="Write your story here... or click 'AI Help' to get started!" 
            autoFocus={false}
          />
        </div>
        <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
          <button 
            onClick={onCancel} 
            className="px-6 py-3 font-bold text-slate-400 hover:text-slate-300 active:scale-95 transition-all"
          >
            Discard
          </button>
          <button 
            onClick={handleSaveClick}
            disabled={isSaving}
            className={`px-8 py-3 bg-gradient-to-r from-ember-400 to-ember-500 text-white font-bold rounded-full shadow-lg shadow-ember-500/30 hover:-translate-y-0.5 active:scale-95 transition-all ${
              isSaving ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Adventure'}
          </button>
        </div>
      </div>
    </div>
  );
};
