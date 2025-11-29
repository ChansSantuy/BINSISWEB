

// File: components/NewsSection.tsx

import React from "react";
import { newsData, tagColorMap } from "../data/homepage/homepageData";
import type { NewsItem } from "../data/homepage/homepageData";

interface NewsSectionProps {
  /** Optional override for the list of news items */
  items?: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ items }) => {
  const list = items ?? newsData;

  return (
    <section id="news" className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div id="newsGrid" className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {list.map((item: NewsItem, idx: number) => {
            interface TagColor {
                bg: string;
                text: string;
                cta: string;
            }

            const color: TagColor = tagColorMap[item.tag] ?? { bg: "bg-gray-100", text: "text-gray-800", cta: "text-gray-600" };
            const formattedDate: string = new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

            return (
                <article key={idx} data-aos="fade-up" data-aos-delay={(idx * 100).toString()} data-aos-once="false" className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />

                    <div className="flex-1 flex flex-col">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span className={`${color.bg} ${color.text} inline-block font-semibold px-2 py-1 rounded-full`}>{item.tag}</span>
                            <div className="flex items-center space-x-2">
                                <time dateTime={item.date}>{formattedDate}</time>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition mb-2">{item.title}</h3>

                        <p className="text-gray-600 text-sm flex-grow">{item.excerpt}</p>

                        <a href={item.link} className={`mt-4 inline-block text-sm font-medium ${color.cta} group-hover:underline`}>
                            Read More →
                        </a>
                    </div>
                </article>
            );
        })}    </div>

        <div className="mt-10 text-center">
          <a href="/news" data-aos="fade-in" data-aos-delay="300" data-aos-once="true" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition">
            View All News
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
