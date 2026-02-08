
import pageLogo from '@/public/cuanto-aumento-logo.png';

const Logo = () => {
    return (
        <div className="group-hover:scale-110 transition-transform duration-300">
            <img 
                src={pageLogo.src} 
                alt="cuantoaumento.com.ar" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
        </div>
    );
};

export default Logo;