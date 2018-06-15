using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImageChopper
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 3)
            {
                System.Console.WriteLine("ImageChopper requires three parameters.");
                System.Console.WriteLine("1) A filepath to an image to chop, 2) the name to save the new images as, 3) true or false (to divide vertically)");
                return;
            }
            if (String.Equals(args[2], "true", StringComparison.InvariantCultureIgnoreCase) || String.Equals(args[2], "t", StringComparison.InvariantCultureIgnoreCase))
            {
                chop2D(args);
            } else
            {
                chop1D(args);
            }
            return;
        }

        private static void chop1D(string[] args)
        {
            int tileWidth = 20;
            string filename = args[0];
            string tileThemeName = args[1];
            Image img = Image.FromFile(filename);
            int numImgs = img.Size.Width / tileWidth;
            Bitmap[] bmps = new Bitmap[numImgs];
            for (int i = 0; i < numImgs; i++)
            {
                bmps[i] = new Bitmap(tileWidth, img.Size.Height);
                Graphics g = Graphics.FromImage(bmps[i]);
                g.DrawImage(img, new Rectangle(0, 0, tileWidth, img.Size.Height), new Rectangle(i * tileWidth, 0, tileWidth, img.Size.Height), GraphicsUnit.Pixel);
                g.Dispose();
                Image newImage = bmps[i];
                string imageName = tileThemeName + "_" + i + ".png";
                newImage.Save(imageName, ImageFormat.Png);
                Console.WriteLine("created " + imageName);
            }
            return;
        }

        private static void chop2D(string[] args)
        {
            int tileWidth = 20;
            int tileHeight = 20;
            string filename = args[0];
            string tileThemeName = args[1];
            Image img = Image.FromFile(filename);
            int numImgsWide = img.Size.Width / tileWidth;
            int numImgsTall = img.Size.Height / tileHeight;
            Bitmap[,] bmps = new Bitmap[numImgsWide, numImgsTall];
            for (int i = 0; i < numImgsWide; i++)
            {
                for (int j = 0; j < numImgsTall; j++)
                {
                    bmps[i,j] = new Bitmap(tileWidth, tileHeight);
                    Graphics g = Graphics.FromImage(bmps[i,j]);
                    g.DrawImage(img, new Rectangle(0, 0, tileWidth, tileHeight), new Rectangle(i * tileWidth, j * tileHeight, tileWidth, tileHeight), GraphicsUnit.Pixel);
                    g.Dispose();
                    Image newImage = bmps[i,j];
                    string imageName = tileThemeName + "_" + i + "_" + j + ".png";
                    newImage.Save(imageName, ImageFormat.Png);
                    Console.WriteLine("created " + imageName);
                }
            }
            return;
        }
    }
}
