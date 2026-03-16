'use client';
import { motion } from 'framer-motion';
import { Users, AlertCircle, CheckCircle, TrendingUp, Search } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const stats = [
  { label: 'Total Assessments', value: '128', icon: Users, color: 'text-primary' },
  { label: 'High Risk Cluster', value: '12', icon: AlertCircle, color: 'text-accent-coral' },
  { label: 'Completed Review', value: '84', icon: CheckCircle, color: 'text-accent-green' },
  { label: 'Growth Trend', value: '+14%', icon: TrendingUp, color: 'text-secondary' },
];

const data = [
  { name: 'Jan', value: 40 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 60 },
  { name: 'Apr', value: 45 },
  { name: 'May', value: 70 },
  { name: 'Jun', value: 85 },
];

const students = [
  { id: '1', name: 'Alex Rivera', age: 7, risk: 'High', dyslexia: 0.82, adhd: 0.45 },
  { id: '2', name: 'Emma Watson', age: 6, risk: 'Low', dyslexia: 0.12, adhd: 0.22 },
  { id: '3', name: 'James Bond', age: 8, risk: 'Moderate', dyslexia: 0.42, adhd: 0.55 },
  { id: '4', name: 'Sophia Loren', age: 7, risk: 'High', dyslexia: 0.78, adhd: 0.88 },
];

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10 font-sans">
      {/* Sidebar Navigation Mockup */}
      <div className="fixed left-0 top-0 h-full w-20 bg-slate-900 flex flex-col items-center py-8 gap-10 z-50">
         <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">B</div>
         <div className="flex flex-col gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                <div className="w-5 h-5 border-2 border-current rounded-md" />
              </div>
            ))}
         </div>
         <div className="mt-auto mb-8">
            <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-600" />
         </div>
      </div>

      <div className="ml-24 max-w-7xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full font-bold text-[10px] uppercase tracking-widest">Active System</span>
               <span className="text-slate-300 text-xs font-bold">Grade 2-B</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">Educator Command Center</h1>
            <p className="text-slate-400 font-bold text-sm mt-3 uppercase tracking-widest">St. Mary's Elementary School</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-white text-slate-500 rounded-xl font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors uppercase text-[10px] tracking-widest">Export Report</button>
            <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all text-sm">Add New Student</button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-5 group hover:shadow-xl transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${s.color} group-hover:scale-110 transition-transform`}>
                <s.icon size={22} strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 leading-none">{s.value}</span>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm min-h-[400px]">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-black text-slate-800 tracking-tight">Screening Activity Trend</h3>
               <select className="bg-slate-50 border-none rounded-lg px-4 py-2 text-xs font-bold text-slate-500 outline-none">
                  <option>Last 6 Months</option>
               </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 800, fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 800, fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', fontWeight: 800 }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={5} dot={{ r: 0 }} activeDot={{ r: 8, fill: '#4f46e5', stroke: '#fff', strokeWidth: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-slate-800 tracking-tight mb-10">Risk Profile Breakdown</h3>
            <div className="flex-1 w-full min-h-[250px]">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{name: 'Low', val: 45}, {name: 'Med', val: 32}, {name: 'High', val: 23}]}>
                    <Bar dataKey="val" fill="#ef4444" radius={[8, 8, 8, 8]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <div className="flex justify-between mt-6 px-2">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High Risk</span>
               </div>
               <span className="text-xs font-black text-slate-800 text-end">23%</span>
            </div>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden mb-10">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">Active Student Profiles</h3>
            <div className="relative w-full md:w-72">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
               <input type="text" placeholder="Search student names..." className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-3 text-xs font-bold focus:outline-none focus:ring-4 ring-indigo-500/5 transition-all" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-10 py-5 text-left">Student Profile</th>
                  <th className="px-10 py-5 text-left">Risk Level</th>
                  <th className="px-10 py-5 text-left">Reading Progress</th>
                  <th className="px-10 py-5 text-left">Math Progress</th>
                  <th className="px-10 py-5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center font-black text-indigo-400 border border-indigo-100 shadow-sm">
                          {st.name[0]}
                        </div>
                        <div>
                           <span className="font-bold text-slate-800 block leading-none mb-1">{st.name}</span>
                           <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Age {st.age}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <span className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest border
                        ${st.risk === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : st.risk === 'Moderate' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}
                      `}>
                        {st.risk}
                      </span>
                    </td>
                    <td className="px-10 py-6">
                      <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                        <div className="h-full bg-indigo-500 transition-all duration-1000" style={{width: `${st.dyslexia * 100}%`}} />
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <div className="w-28 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                        <div className="h-full bg-rose-400 transition-all duration-1000" style={{width: `${st.adhd * 100}%`}} />
                      </div>
                    </td>
                    <td className="px-10 py-6 text-end">
                      <button className="text-indigo-600 font-black uppercase text-[10px] tracking-widest hover:text-indigo-800 transition-colors">Details ➜</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
