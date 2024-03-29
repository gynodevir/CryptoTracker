// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import "./TradingViewWidget.css"

function TradingViewWidget({symbol}) {
  const navigate = useNavigate();
  console.log(symbol)

  const coursesPage = () => {
    navigate('/Trading');
  };
  const goToHomePage = () => {
    navigate('/CryptoTracker');
  };
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "autosize": false,
          "symbol": "${symbol}",
          "interval": "1S",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "in",
          "enable_publishing": false,
          "allow_symbol_change": true,
          "support_host": "https://www.tradingview.com"
        }`;
      container.current.appendChild(script);
    },
    [symbol]
  );
  // Set the body and HTML to have 100% height
  useEffect(() => {
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";
    return () => {
      document.body.style.height = "";
      document.documentElement.style.height = "";
    };
  }, []);

  // Set the TradingView widget container to fullscreen
  useEffect(() => {
    const handleResize = () => {
      container.current.style.height = `${window.innerHeight}px`;
      container.current.style.width = `${window.innerWidth}px`;
    };

    // Set initial size
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (

    <div>
   <div class="glitch" data-text="GLITCH">This is the Chart</div>
   <button onClick={goToHomePage} className='cybr-btn' >Prev <span aria-hidden class="cybr-btn__glitch">Prev</span>
  <span aria-hidden class="cybr-btn__tag">R25</span></button>
  
  <div className="tradingview-widget-container" ref={container} style={{ position : "absolute",marginTop : "20px", height : "30%", width : "100%"}}>
  <div className="tradingview-widget-container__widget" style={{ height : "70%" ,width : "100%" }}></div>
</div>

</div>

  );
}

export default memo(TradingViewWidget);
