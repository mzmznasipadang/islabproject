// src/app/dashboard/page.tsx
import LayoutWrapper from '../components/layout-wrapper'

export default function Dashboard() {
  return (
    <LayoutWrapper>
      <div className="flex min-h-screen p-8 gap-12 flex-col lg:flex-row">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-white mb-6">About the portal</h2>
          <p className="text-white/90 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        
        <div className="lg:w-96">
          <h2 className="text-3xl font-bold text-white mb-6">Kegunaan Portal Ini</h2>
          <div className="flex flex-col gap-4">
            {[
              { icon: "🎓", title: "Analisa Nilai" },
              { icon: "📊", title: "Analisa Statistik" },
              { icon: "🧪", title: "Analisa Probabilitas" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-xl p-4 text-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-white/80">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}