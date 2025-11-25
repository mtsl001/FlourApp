import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Wheat, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is your flour really milled to order?",
    answer: "Yes! Unlike store-bought flour which sits on shelves for months, we mill your grains only after you place an order. This ensures that the natural oils and nutrients remain intact, preventing oxidation and preserving flavor."
  },
  {
    question: "Do you ship internationally?",
    answer: "Currently, we only ship within India to ensure the freshness of our products. We are working on international logistics that can maintain our quality standards."
  },
  {
    question: "Are your blends gluten-free?",
    answer: "We have specific blends that are 100% Gluten-Free (like our Celiac & Gluten Sensitivity blend). However, some of our other blends utilize ancient wheats or grains processed in a facility that handles wheat. Please check the 'Certifications' tag on each product page."
  },
  {
    question: "What is the shelf life of your flour?",
    answer: "Since our flour is preservative-free and fresh-milled, it is best consumed within 3-4 weeks. We recommend storing it in an airtight container in a cool, dry place or the refrigerator to extend freshness up to 6 weeks."
  },
  {
    question: "Can I customize a blend?",
    answer: "For bulk orders or specific medical requirements, we do offer customization. Please contact our support team for consultation."
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are processed and milled within 24 hours. Shipping typically takes 3-5 business days depending on your location in India."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-brand-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <HelpCircle className="w-12 h-12 text-brand-400 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-600">Everything you need to know about our ancient grains and process.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl border transition-all duration-300 ${
                openIndex === index ? 'border-brand-300 shadow-md' : 'border-brand-100 shadow-sm'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
              >
                <span className={`font-serif font-bold text-lg ${openIndex === index ? 'text-brand-800' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-brand-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed border-t border-brand-50 mt-2">
                  <div className="pt-4 flex gap-3">
                    <Wheat className="w-5 h-5 text-brand-300 flex-shrink-0 mt-1" />
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
