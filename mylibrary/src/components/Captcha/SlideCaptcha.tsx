"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const SlideCaptchaModal = () => {
    const [captchaValid, setCaptchaValid] = useState(false);
    const [sliderValue, setSliderValue] = useState(0);
    const router = useRouter();
  
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSliderValue(parseInt(e.target.value, 10));
      if (parseInt(e.target.value, 10) === 100) {
        setCaptchaValid(true);
      }
    };
  
    const handleRedirect = () => {
      if (captchaValid) {
        router.push('https://example.com');
      }
    };
  
    const openModal = () => {
      const modal = document.getElementById('captcha_modal') as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    };
  
    return (
      <>
        {/* Open the modal */}
        <button className="btn" onClick={openModal}>
          Open Captcha Modal
        </button>
  
        {/* Modal with DaisyUI */}
        <dialog id="captcha_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Slide to Verify</h3>
            <p className="py-4">Please slide the bar to verify that you&apos;re human.</p>
  
            {/* Slider for captcha */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              className="range range-primary"
              onChange={handleSliderChange}
            />
  
            {/* Feedback on success */}
            {captchaValid && (
              <p className="text-green-600 font-bold mt-4">Captcha Verified!</p>
            )}
  
            <div className="modal-action">
              {/* Redirect Button */}
              <button className="btn" disabled={!captchaValid} onClick={handleRedirect}>
                Continue
              </button>
  
              {/* Close Button */}
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </>
    );
  };
  
  export default SlideCaptchaModal