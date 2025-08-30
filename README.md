# Klonlab Creative Studio

An immersive 3D web experience for a creative digital studio, featuring a video game-like navigation system where users can explore different rooms and content areas through a virtual tunnel interface.

## ✨ Features

- **Immersive Landing Page**: Beautiful animated landing page with particle effects
- **3D Tunnel Navigation**: Video game-like experience with WASD/arrow key controls
- **Room-Based Content**: Different rooms for About, Portfolio, Services, and Contact
- **Smooth Transitions**: Cinematic transitions from 2D to 3D experience
- **Physics Integration**: Realistic movement and collision detection with Rapier
- **CMS Integration**: Content management with Sanity CMS
- **Responsive Design**: Optimized for different screen sizes

## 🚀 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **3D Graphics**: React Three Fiber + Drei
- **Physics**: React Three Rapier
- **Animations**: Framer Motion
- **CMS**: Sanity
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## 🎮 Controls

Once you enter the 3D experience:

- **WASD** or **Arrow Keys**: Move around
- **Mouse**: Look around (first-person view)
- **Walk into rooms**: Enter different content areas
- **Exit Experience**: Button in top-right corner

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd klonlab-next-3d
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page with state management
│   └── layout.tsx            # Root layout
├── components/
│   ├── LandingPage.tsx       # 2D landing page component
│   ├── Scene3D.tsx           # 3D scene wrapper
│   ├── TunnelExperience.tsx  # Main 3D experience with controls
│   ├── TunnelSegment.tsx     # Individual tunnel segments
│   └── Room.tsx              # Interactive room components
└── lib/
    └── sanity.ts             # Sanity CMS configuration
```

## 🎨 Customization

### Adding New Rooms

1. Update the `Room.tsx` component with new room types
2. Add room instances in `TunnelExperience.tsx`
3. Configure room content and positioning

### Modifying Tunnel Design

- Edit `TunnelSegment.tsx` for visual changes
- Adjust lighting and materials in the components
- Modify physics colliders for different interactions

### Content Management

- Set up Sanity Studio for content editing
- Use the provided schema types in `lib/sanity.ts`
- Fetch content in room components

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Performance Optimization

- 3D models are optimized for web
- Textures are compressed
- Physics calculations are optimized
- Lazy loading for 3D components

## 📱 Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

**Note**: WebGL support is required for the 3D experience.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the GitHub issues
- Review the documentation
- Contact the development team

---

**Built with ❤️ for immersive web experiences**
