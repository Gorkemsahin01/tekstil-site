import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, FlaskConical, Factory, PackageCheck } from 'lucide-react';

const modules = [
  {
    id: '01',
    title: 'Kumaş & Aksesuar Girişi',
    icon: <Scissors className="w-8 h-8" />,
    description: 'Tedarikçilerden gelen ham kumaş ve aksesuarların sisteme kaydı, barkodlanması ve depo lokasyon takibi.',
    color: 'bg-blue-50 text-blue-600',
    border: 'border-blue-100'
  },
  {
    id: '02',
    title: 'Laboratuvar & Test',
    icon: <FlaskConical className="w-8 h-8" />,
    description: 'Yıkama, çekmezlik, renk haslığı gibi test süreçlerinin takibi ve onay/red mekanizmalarının yönetimi.',
    color: 'bg-purple-50 text-purple-600',
    border: 'border-purple-100'
  },
  {
    id: '03',
    title: 'Kesim & Dikim (Üretim)',
    icon: <Factory className="w-8 h-8" />,
    description: 'Numunenin üretim bandındaki serüveni. Hangi atölyede, hangi aşamada olduğunun anlık izlenmesi.',
    color: 'bg-orange-50 text-orange-600',
    border: 'border-orange-100'
  },
  {
    id: '04',
    title: 'Kalite Kontrol & Sevkiyat',
    icon: <PackageCheck className="w-8 h-8" />,
    description: 'Son kontrollerin yapılması, müşteri onayına sunulması ve kargo/sevkiyat entegrasyonu ile sürecin tamamlanması.',
    color: 'bg-green-50 text-green-600',
    border: 'border-green-100'
  }
];

export default function Modules() {
  return (
    <section id="moduller" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">Esnek Yapı</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">İhtiyacınıza Göre Modüller</h3>
            <p className="text-lg text-gray-600">
             Konfeksiyon üretiminin her aşaması için özel olarak tasarlanmış modüllerle kendi sisteminizi kurun.
            </p>
          </div>
          <button className="text-brand-600 font-semibold hover:text-brand-700 flex items-center gap-2">
            Tüm Modülleri Gör &rarr;
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white rounded-3xl p-8 border ${mod.border} hover:shadow-xl transition-shadow flex flex-col sm:flex-row gap-6 items-start`}
            >
              <div className={`shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center ${mod.color}`}>
                {mod.icon}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-gray-400">{mod.id}</span>
                  <h4 className="text-xl font-bold text-gray-900">{mod.title}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
