import { useState, useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { Story } from '../types';

interface EditorViewProps {
  initialData?: Story | null;
  onSave: (data: Story) => void;
  onCancel: () => void;
  isGold?: boolean;
}

export const EditorView = ({ initialData, onSave, onCancel }: EditorViewProps) => {
  const [form, setForm] = useState<Story>(
    initialData || { 
      title: "New Story", 
      author: "Explorer", 
      settings: { mps: 10, transition: 'fade', filter: 'none' }, 
      pages: [{ text: "", images: [] }] 
    }
  );
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress image to reduce file size
  const compressImage = (file: File, maxWidth = 1920, quality = 0.8): Promise<{ url: string; file: File }> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Resize if too large
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, { type: 'image/jpeg' });
                const url = URL.createObjectURL(blob);
                resolve({ url, file: compressedFile });
              } else {
                // Fallback if compression fails
                resolve({ url: e.target?.result as string, file });
              }
            },
            'image/jpeg',
            quality
          );
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    ).slice(0, 10); // Limit to 10 images
    
    if (imageFiles.length === 0) {
      alert('Please drop image files only (JPG, PNG, WebP, etc.)');
      return;
    }

    // Compress and convert files
    try {
      const compressedImages = await Promise.all(
        imageFiles.map(file => compressImage(file))
      );

      const currentPage = form.pages[active];
      const updatedPages = [...form.pages];
      updatedPages[active] = {
        ...currentPage,
        images: [
          ...currentPage.images,
          ...compressedImages.map(img => ({ url: img.url }))
        ]
      };
      setForm({ ...form, pages: updatedPages });
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
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
    <div className="bg-white rounded-3xl shadow-xl border overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      <div className="w-full md:w-72 bg-slate-50 border-r p-6 space-y-6">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">
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
            className="w-full accent-indigo-600" 
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
                  ? 'border-indigo-600 bg-white shadow-sm' 
                  : 'border-transparent opacity-60'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-400">Page {i+1}</div>
              <div className="text-xs truncate">{p.text || "..."}</div>
            </div>
          ))}
          <button 
            onClick={() => setForm({
              ...form, 
              pages: [...form.pages, { text: "", images: [] }]
            })} 
            className="w-full py-2 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-400 text-xs font-bold active:scale-95 hover:shadow-lg transition-all"
          >
            + Add Page
          </button>
        </div>
      </div>
      <div className="flex-1 p-8 space-y-6">
        <input 
          value={form.title} 
          onChange={e => setForm({...form, title: e.target.value})} 
          className="text-3xl font-black border-none focus:ring-0 w-full p-0" 
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
                ? 'bg-indigo-50 border-indigo-400 border-solid' 
                : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => handleFiles(e.target.files)}
            />
            <UploadCloud size={24} className={isDragging ? 'text-indigo-600' : 'text-slate-400'} />
            <span className={`text-xs font-bold mt-1 ${isDragging ? 'text-indigo-600' : 'text-slate-400'}`}>
              {isDragging ? 'Drop photos here' : 'Drag photos here'}
            </span>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <UploadCloud size={18} />
            Upload Photos
          </button>
          {form.pages[active].images.length > 0 && (
            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
              {form.pages[active].images.length} photo(s) added (automatically compressed)
            </div>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-500">Story Text</label>
            <button
              onClick={() => {
                const userPrompt = window.prompt('Describe your story or memory, and AI will help write it:');
                if (userPrompt) {
                  // Simple AI placeholder - in production, this would call an AI API
                  const aiText = `Once upon a time, ${userPrompt.toLowerCase()}. The memory was captured in this moment, forever preserved in this pocket of time.`;
                  let p = [...form.pages];
                  p[active].text = aiText;
                  setForm({...form, pages: p});
                }
              }}
              className="text-xs px-3 py-1 bg-amber-100 text-amber-700 font-bold rounded-full hover:bg-amber-200 active:scale-95 transition-all"
            >
              ✨ AI Help
            </button>
          </div>
          <textarea 
            value={form.pages[active].text} 
            onChange={e => { 
              let p = [...form.pages]; 
              p[active].text = e.target.value; 
              setForm({...form, pages: p}); 
            }} 
            className="w-full h-48 text-xl font-serif leading-relaxed border-2 border-slate-300 rounded-xl p-4 bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none placeholder:text-slate-400" 
            placeholder="Write your story here... or click 'AI Help' to get started!" 
          />
        </div>
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button 
            onClick={onCancel} 
            className="px-6 py-2 font-bold text-slate-400 active:scale-95 hover:shadow-lg transition-all"
          >
            Discard
          </button>
          <button 
            onClick={() => onSave(form)} 
            className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-full shadow-lg active:scale-95 hover:shadow-lg transition-all"
          >
            Save Adventure
          </button>
        </div>
      </div>
    </div>
  );
};

