import os
import subprocess
current_dir = os.path.dirname(os.path.realpath(__file__))
subprocess.call(['bash', current_dir + '/npm.sh'])