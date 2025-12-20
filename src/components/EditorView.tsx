import { useState } from 'react';
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
        <div className="h-48 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400">
          <UploadCloud size={32} />
          <span className="text-xs font-bold mt-2">Drop up to 10 photos here</span>
        </div>
        <textarea 
          value={form.pages[active].text} 
          onChange={e => { 
            let p = [...form.pages]; 
            p[active].text = e.target.value; 
            setForm({...form, pages: p}); 
          }} 
          className="w-full h-48 text-xl font-serif leading-relaxed border-none focus:ring-0 resize-none" 
          placeholder="Once upon a time..." 
        />
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

