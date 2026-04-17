import Markdown from 'react-markdown'
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import rehypeRaw from 'rehype-raw';

interface Props {
  md_file: string
  title_identifier: string
}

const MarkdownPage: React.FC<Props> = (props) => {

  const { t, i18n } = useTranslation();
  const [content, setContent] = useState('');
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.error(`/locales/${i18n.language}/${props.md_file}`);
    const loadFile = async () => {
      const targetPath = `/locales/${i18n.language}/${props.md_file}`;

      try {
        const response = await fetch(targetPath);
        if (!response.ok) throw new Error("Markdown not found");
        const text = await response.text();
        setContent(text);
      } catch (err) {
        // 2. Fallback to English if the specific locale fetch fails
        console.warn(`Could not find MD for ${i18n.language}, falling back to English.`);
        const fallback = await fetch(`/locales/en/${props.md_file}`);
        const fallbackText = await fallback.text();
        setContent(fallbackText);
      }
    };

    loadFile();
  }, [i18n.language]); // This dependency is key: it re-runs when JSON language changes

  return <>
    <Helmet>
      <title>{t(props.title_identifier)}</title>
    </Helmet>
    <div className="bg-white text-gray-900 pt-16 pb-16">
      <div className="max-w-4xl mx-auto px-6 md:px-16">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={{
            // Target H1 specifically
            h1: ({ node, ...props }) => (
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 flex items-center gap-4 mt-12 mb-4 group">
                {props.children}
              </h1>
            ),
            // Target H2 specifically
            h2: ({ node, ...props }) => (
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-4 mt-8 mb-4 group">
                {props.children}
              </h2>
            ),
            // Style Paragraphs
            p: ({ node, ...props }) => (
              <p className="text-gray-500 leading-relaxed mb-4" {...props} />
            ),
            // Style Lists
            ul: ({ node, ...props }) => (
              <ul className="list-none space-y-4 ml-2 mb-6" {...props} />
            ),
            li: ({ node, ...props }) => (
              <li className="flex items-start gap-2 text-gray-500 leading-relaxed">
                <span className="text-brand-red">•</span>
                <div>
                  {props.children}
                </div>
              </li>
            ),
            // Style Links
            a: ({ node, ...props }) => (
              <a
                className="text-brand-red font-semibold border-b border-brand-red/30 hover:border-brand-red transition-colors"
                {...props}
              />
            ),
            img: ({ node, ...props }) => (
              <span className="block w-full my-8 overflow-visible">
                <img
                  {...props}
                  className="mx-auto block w-auto max-w-full h-auto object-contain"
                  style={{ maxHeight: 'none' }} // Prevents clipping if a parent has a max-height
                  loading="lazy"
                />
              </span>
            ),
          }}
        >
          {content}</Markdown>
      </div>
    </div>
  </>;
};

export default MarkdownPage;
