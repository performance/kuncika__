// ಮೂಲ: https://pythonturtle.academy/tutorial-drawing-egg-shape-with-python-turtle/

ಅಂಡಾಕಾರ = (x, y, ಪರಿಮಾಣ, ಇಳಿಜಾರು) => {
  ಕುಂಚಿಕವನ್ನು_ಎತ್ತಿ()
  ಸ್ಥಾನ_ಬದಿಲಿಸಿ(x,y)
  ಕುಂಚಿಕವನ್ನು_ಕೆಳಗೆ_ಇರಿಸಿ()
  ದಿಕ್ಕನ್ನು_ಬದಲಿಸಿ(270+ಇಳಿಜಾರು)
  ವರ್ಣ_ಬದಲಿಸಿ(4) // red
  ಬಲಕ್ಕೆ_ಚಾಪ(ಪರಿಮಾಣ,180)
  ವರ್ಣ_ಬದಲಿಸಿ(1) // blue
  ಬಲಕ್ಕೆ_ಚಾಪ(2*ಪರಿಮಾಣ,45)
  ವರ್ಣ_ಬದಲಿಸಿ(10) // green
  ಬಲಕ್ಕೆ_ಚಾಪ(0.586*ಪರಿಮಾಣ,90)
  ವರ್ಣ_ಬದಲಿಸಿ(1) // blue
  ಬಲಕ್ಕೆ_ಚಾಪ(2*ಪರಿಮಾಣ,45)
}

ಪ್ರದರ್ಶನೆ = () => {
  ಆದಿ_ಸ್ಥಿತಿ();
  ಕುಂಚಿಕವನ್ನು_ಮರೆಮಾಡಿ();
  ಅಂಡಾಕಾರ( 90, 90, 40, 0 )
  ಅಂಡಾಕಾರ( 0, 0, 90, 45 )
}
