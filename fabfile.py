__author__ = 'aub3'
from fabric.api import local,lcd,env,sudo,put,cd,run,get
import glob,logging
from worker.config import HOST,KEYFILE

env.hosts = [HOST,]
env.user = 'ubuntu'
env.key_filename = KEYFILE

def init_app():
    pass

def test():
    init_app()
    local("dev_appserver.py --port 10650 --admin_port 10640 .")

def deploy():
    init_app()
    local("appcfg.py update .")

def backup_bucket():
    raise NotImplementedError

def setup_worker():
    sudo("add-apt-repository ppa:webupd8team/java")
    sudo("apt-get update")
    sudo("apt-get -qq install ImageMagick")
    sudo("echo oracle-java7-installer shared/accepted-oracle-license-v1-1 select true | sudo /usr/bin/debconf-set-selections")
    sudo("apt-get install oracle-java7-installer")
    sudo("apt-get install oracle-java7-set-default")
    sudo("apt-get -qq remove ffmpeg x264 libx264-dev")
    sudo("apt-get -qq install python-pip unzip libopencv-dev build-essential checkinstall cmake pkg-config yasm libjpeg-dev libjasper-dev libavcodec-dev libavformat-dev libswscale-dev libdc1394-22-dev libxine-dev libgstreamer0.10-dev libgstreamer-plugins-base0.10-dev libv4l-dev python-dev python-numpy libtbb-dev libqt4-dev libgtk2.0-dev libmp3lame-dev libopencore-amrnb-dev libopencore-amrwb-dev libtheora-dev libvorbis-dev libxvidcore-dev x264 v4l-utils")
    put('worker/packages/opencv-2.4.10.zip','opencv-2.4.10.zip')
    run("unzip opencv-2.4.10.zip")
    with cd('opencv-2.4.10'):
        run("mkdir build")
        with cd("build"):
            run("cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local -D WITH_TBB=ON -D BUILD_NEW_PYTHON_SUPPORT=ON -D WITH_V4L=ON -D INSTALL_C_EXAMPLES=ON -D INSTALL_PYTHON_EXAMPLES=ON -D BUILD_EXAMPLES=ON -D WITH_QT=ON -D WITH_OPENGL=ON ..")
            run("make -j2")
            sudo("checkinstall")
            sudo("sh -c 'echo \"/usr/local/lib\" > /etc/ld.so.conf.d/opencv.conf'")
            sudo("ldconfig")

def test_worker():
    try:
        run("rm -rf inpaint*")
    except:
        pass
    put("worker/config.py","")
    put("worker/worker.py","")
    put("worker/inpaint","")
    with cd("inpaint"):
        run("javac Main.java Inpaint.java MaskedImage.java NNF.java")
        run("mv *.class ../")
    run("python worker.py")
    # run("python worker.py &;disown -r")
    get("*.jpg","logs/")
    get("*.png","logs/")
