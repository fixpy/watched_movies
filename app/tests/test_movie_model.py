import unittest
import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), '../..'))

from app.models import User

class UserModelTestCase(unittest.TestCase):
  def test_something(self):
    self.assertTrue('something' is not None)

if __name__ == '__main__':
  unittest.main()