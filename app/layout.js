import './globals.css';
import '@/index.css';
import { AnalyticsProvider } from '@/components/shared/AnalyticsProvider';
import { ProfileProvider } from '@/lib/context/ProfileContext';
import { NumberDetailProvider } from '@/lib/context/NumberDetailContext';

export const metadata = {
  title: 'NUMERO - Khám Phá Bản Đồ Năng Lượng Pythagoras',
  description: 'Nền tảng thần số học chuẩn mực: Tĩnh tại, Tri thức và Định hướng phát triển bản thân theo trường phái Pythagoras.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="light" suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..800;1,9..144,400..700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <AnalyticsProvider />
        <ProfileProvider>
          <NumberDetailProvider>
            {children}
          </NumberDetailProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
