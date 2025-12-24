import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';
import { format } from 'date-fns';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-slate-700 to-slate-800' 
          : 'bg-gradient-to-br from-blue-600 to-cyan-500'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[85%] ${isUser ? 'flex flex-col items-end' : ''}`}>
        <div className={`rounded-2xl px-5 py-4 ${
          isUser 
            ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white' 
            : 'bg-slate-900 border border-slate-800 text-slate-200'
        }`}>
          {isUser ? (
            <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown
              className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              components={{
                p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                ul: ({ children }) => <ul className="my-3 ml-4 list-disc space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="my-3 ml-4 list-decimal space-y-1">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                h1: ({ children }) => <h1 className="text-xl font-bold text-white mt-4 mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-semibold text-white mt-3 mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-semibold text-cyan-400 mt-3 mb-2">{children}</h3>,
                code: ({ inline, children }) => 
                  inline ? (
                    <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block p-3 rounded-lg bg-slate-800 text-cyan-300 text-sm font-mono overflow-x-auto">
                      {children}
                    </code>
                  ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-cyan-500 pl-4 my-3 text-slate-300 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
        {message.timestamp && (
          <div className="text-xs text-slate-500 mt-1 px-2">
            {format(message.timestamp, 'HH:mm')}
          </div>
        )}
      </div>
    </div>
  );
}