from neopixel import Neopixel # type: ignore

class ledControlClass:
   numpix = 0
   pin_number = 0
   strip = Neopixel(numpix, 0 , pin_number, "GRB")

   def __init__(self,numpix,pin_number):
      self.numpix     = numpix
      self.pin_number = pin_number

      self.strip      = Neopixel(numpix, 0 , pin_number, "GRB")

   def fill(self,color_RGB):
      self.strip.fill((color_RGB[0],color_RGB[1],color_RGB[2]))
      self.strip.show()
