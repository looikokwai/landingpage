import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import TelegramIcon from '@mui/icons-material/Telegram'

export default function FloatingContact() {
    return (
        <div className="fixed bottom-28 right-5 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-3">
            <a
                href="https://google.com" // 在这里替换您的WhatsApp号码
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Chat on WhatsApp"
            >
                <WhatsAppIcon size={28} />
            </a>
            <a
                href="https://google.com" // 在这里替换您的Telegram用户名
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
                aria-label="Contact on Telegram"
            >
                <TelegramIcon size={28} />
                </a>
        </div>
    );
}
