import type { ChatbotConversation } from "../../types/demo";

interface ChatbotMockupProps {
  conversation: ChatbotConversation;
  title: string;
}

export function ChatbotMockup({ conversation, title }: ChatbotMockupProps) {
  // Keep the chat focused on the core MyBank recommendation.
  const firstAiIndex = conversation.messages.findIndex((msg) => msg.role === "ai");
  const focusedMessages =
    firstAiIndex >= 0
      ? conversation.messages.slice(0, firstAiIndex + 1)
      : conversation.messages.slice(0, 2);

  return (
    <div className="flex justify-center py-1">
      <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
        <div className="relative" style={{ width: 268 }}>
          {/* Side buttons */}
          <div
            className="absolute top-[84px] rounded-l-[3px]"
            style={{ left: 0, width: 3, height: 28, background: "#2a2a2e" }}
          />
          <div
            className="absolute top-[126px] rounded-l-[3px]"
            style={{ left: 0, width: 3, height: 44, background: "#2a2a2e" }}
          />
          <div
            className="absolute top-[176px] rounded-l-[3px]"
            style={{ left: 0, width: 3, height: 44, background: "#2a2a2e" }}
          />
          <div
            className="absolute top-[162px] rounded-r-[3px]"
            style={{ right: 0, width: 3, height: 76, background: "#2a2a2e" }}
          />

          <div
            className="rounded-[42px] p-[10px] shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #202024 0%, #2f2f35 45%, #19191d 100%)",
              boxShadow:
                "0 28px 52px -22px rgba(0,0,0,.55), inset 0 1px 1px rgba(255,255,255,.08), inset 0 -1px 1px rgba(0,0,0,.35)",
            }}
          >
            <div
              className="relative rounded-[34px] overflow-hidden bg-slate-100"
              style={{ height: 552 }}
            >
              {/* Dynamic island */}
              <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-[86px] h-[24px] rounded-[13px] bg-black z-10" />

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 pt-10 pb-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">💬</div>
                <div>
                  <div className="text-sm font-semibold">MyBank Assistant</div>
                  <div className="text-[11px] opacity-80 truncate max-w-[150px]">{title}</div>
                </div>
              </div>

              {/* Messages */}
              <div className="px-3 py-3 space-y-2 bg-slate-50" style={{ height: 420 }}>
                {focusedMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] px-3 py-2 rounded-lg text-[13px] leading-relaxed ${
                        msg.role === "user"
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Footer */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-3 py-2.5 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about this moment..."
                  className="flex-1 px-3 py-1.5 border border-slate-300 rounded-full text-xs bg-slate-50"
                  disabled
                />
                <button className="bg-blue-500 text-white rounded-full w-7 h-7 text-xs disabled:opacity-50" disabled>
                  ➤
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Mobile Chat</span>
          </div>
        </div>
      </div>
    </div>
  );
}
