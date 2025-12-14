'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function FAQSection() {
  const t = useTranslations('home.faq');

  const faqs = [
    {
      icon: '❓',
      question: t('q1.question'),
      answer: t('q1.answer'),
    },
    {
      icon: '⏱️',
      question: t('q2.question'),
      answer: t('q2.answer'),
    },
    {
      icon: '💎',
      question: t('q3.question'),
      answer: t('q3.answer'),
    },
    {
      icon: '🔒',
      question: t('q4.question'),
      answer: t('q4.answer'),
    },
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-teal-50/30">
      <div className="container mx-auto max-w-5xl">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-5xl">💬</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* FAQ 列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="border-0 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  {/* 图标 */}
                  <div className="flex-shrink-0 text-4xl transform group-hover:scale-110 transition-transform duration-300">
                    {faq.icon}
                  </div>
                  
                  {/* 问题 */}
                  <CardTitle className="font-heading text-xl font-bold text-gray-900 leading-tight">
                    {faq.question}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0 pl-16">
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </CardContent>
              
              {/* 底部装饰线 */}
              <div className="h-1 bg-gradient-to-r from-orange-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
