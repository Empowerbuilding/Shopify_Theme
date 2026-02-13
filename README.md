# Barnhaus Steel Builders - Shopify Theme

A premium custom Shopify theme designed specifically for Barnhaus Steel Builders, featuring a modern dark design with gold accents and optimized for steel building products.

## 🎨 Design Features

### Brand Colors
- **Background**: `#1C1C1C` (Dark Charcoal)
- **Primary Gold**: `#B8860B`
- **Dark Gold**: `#966F09`
- **Card Background**: `#2A2A2A`
- **Text Gray**: `#D1D5DB`
- **Border**: `#3A3A3A`

### Design Elements
- ✨ Gold gradient headings and buttons
- 🎯 Sticky header with smooth navigation
- 🖼️ Product cards with hover effects
- 📱 Fully responsive mobile design
- 🔍 Small, elegant header icons (28px x 28px)
- 💫 Smooth animations and transitions
- 🛒 Interactive cart with live updates

## 📁 Theme Structure

```
barnhaus-shopify-theme/
├── layout/
│   └── theme.liquid              # Main theme template
├── templates/
│   ├── index.json                # Homepage template
│   ├── product.json              # Product page template
│   ├── collection.json           # Collection page template
│   └── cart.json                 # Cart page template
├── sections/
│   ├── main-product.liquid       # Product display section
│   ├── main-collection.liquid    # Collection grid section
│   └── featured-collection.liquid # Featured products section
├── snippets/
│   └── meta-tags.liquid          # SEO meta tags
├── assets/
│   └── custom-barnhaus.css       # Complete theme styling
├── config/
│   ├── settings_schema.json      # Theme customization settings
│   └── settings_data.json        # Theme data structure
└── locales/
    └── en.default.json           # English translations
```

## 🚀 Installation Instructions

### Method 1: Manual Upload (Recommended)

1. **Prepare the Theme Files**
   - Ensure all files are in the `barnhaus-shopify-theme` folder
   - Verify the folder structure matches the layout above

2. **Create a ZIP File**
   - Select all folders inside `barnhaus-shopify-theme` (layout, templates, sections, etc.)
   - Right-click and create a ZIP archive
   - Name it `barnhaus-theme.zip`

3. **Upload to Shopify**
   - Log in to your Shopify admin panel
   - Navigate to **Online Store > Themes**
   - Click **Upload theme** button
   - Select your `barnhaus-theme.zip` file
   - Wait for the upload to complete

4. **Publish the Theme**
   - Once uploaded, click **Customize** to preview
   - Click **Publish** when ready to make it live

### Method 2: Shopify CLI (For Developers)

```bash
# Install Shopify CLI if you haven't already
npm install -g @shopify/cli @shopify/theme

# Navigate to your theme directory
cd barnhaus-shopify-theme

# Log in to your Shopify store
shopify login --store your-store-name.myshopify.com

# Push theme to Shopify
shopify theme push

# Or serve for development
shopify theme dev
```

## ⚙️ Theme Customization

### Changing Brand Colors

1. **Via Shopify Admin** (Easiest)
   - Go to **Online Store > Themes**
   - Click **Customize** on your theme
   - Navigate to **Theme settings > Colors**
   - Adjust colors as needed
   - Click **Save**

2. **Via CSS File** (Advanced)
   - Edit `assets/custom-barnhaus.css`
   - Locate the `:root` section at the top
   - Modify the CSS variables:

   ```css
   :root {
     --color-background: #1C1C1C;      /* Main background */
     --color-primary-gold: #B8860B;    /* Primary gold color */
     --color-gold-dark: #966F09;       /* Dark gold shade */
     --color-card-bg: #2A2A2A;         /* Product card background */
     --color-text-gray: #D1D5DB;       /* Text color */
     --color-border: #3A3A3A;          /* Border color */
   }
   ```

### Uploading Your Logo

1. Go to **Online Store > Themes > Customize**
2. Click **Theme settings > Logo**
3. Upload your logo image
   - Recommended size: **200px × 60px**
   - Format: PNG or SVG (with transparent background)
4. Adjust logo width if needed
5. Click **Save**

### Setting Up Favicon

1. Go to **Online Store > Themes > Customize**
2. Click **Theme settings > Favicon**
3. Upload your favicon
   - Recommended size: **32px × 32px**
   - Format: PNG or ICO
4. Click **Save**

### Customizing Navigation

1. Go to **Online Store > Navigation**
2. Click on **Main menu**
3. Add/edit menu items:
   - Home
   - Catalog (link to `/collections/all`)
   - Contact (link to `/pages/contact`)
4. Click **Save menu**

## 🎯 Key Features

### Product Page Features
- ✅ Image gallery with thumbnails
- ✅ Variant selector (size, color, etc.)
- ✅ Quantity selector with +/- buttons
- ✅ Add to cart functionality
- ✅ Stock status display
- ✅ Sale price comparison
- ✅ Product descriptions
- ✅ Shipping information

### Collection Page Features
- ✅ Product grid layout
- ✅ Sorting options (price, name, date, etc.)
- ✅ Product count display
- ✅ Pagination
- ✅ "Sale" and "Sold Out" badges
- ✅ Hover effects on product cards

### Cart Features
- ✅ Cart item management
- ✅ Quantity updates
- ✅ Remove items
- ✅ Subtotal calculation
- ✅ Live cart count in header
- ✅ Cart notes option
- ✅ Shipping policy display

### Header Features
- ✅ Sticky navigation
- ✅ Logo display
- ✅ Search icon (28px)
- ✅ Cart icon with count badge (28px)
- ✅ Mobile hamburger menu
- ✅ Responsive navigation

### Footer Features
- ✅ Company information
- ✅ Quick links
- ✅ Customer service links
- ✅ Contact information
- ✅ Copyright notice
- ✅ Multi-column layout

## 📱 Responsive Breakpoints

The theme is fully responsive with optimized layouts for:

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🛠️ Customization Options

### Theme Settings Available in Shopify Admin

1. **Logo Settings**
   - Upload logo image
   - Adjust logo width

2. **Color Settings**
   - Background color
   - Primary gold color
   - Dark gold color
   - Card background
   - Text color
   - Border color

3. **Typography Settings**
   - Heading font
   - Body font
   - Base font size

4. **Product Settings**
   - Products per row
   - Show/hide vendor
   - Show/hide compare price
   - Enable image zoom
   - Social sharing buttons

5. **Cart Settings**
   - Cart type (page or drawer)
   - Enable cart notes

6. **Social Media**
   - Facebook URL
   - Instagram URL
   - Twitter URL
   - YouTube URL
   - LinkedIn URL
   - Social sharing image

7. **Footer Settings**
   - Show social icons
   - Show payment icons
   - Copyright text

## 🔧 Technical Details

### Technologies Used
- **Shopify Liquid**: Template language
- **CSS3**: Custom styling with CSS variables
- **Vanilla JavaScript**: Interactive features
- **Responsive Design**: Mobile-first approach
- **Flexbox & Grid**: Modern layout techniques

### Browser Support
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Optimizations
- Lazy loading for images
- Optimized CSS with minimal specificity
- Efficient JavaScript with event delegation
- CSS transitions for smooth animations
- Minimal external dependencies

## 📝 File Descriptions

### Layout Files
- **theme.liquid**: Main theme template, includes header, footer, and content areas

### Template Files
- **index.json**: Homepage layout configuration
- **product.json**: Product page layout configuration
- **collection.json**: Collection page layout configuration
- **cart.json**: Cart page layout configuration

### Section Files
- **main-product.liquid**: Product display with image gallery, variants, and add to cart
- **main-collection.liquid**: Collection grid with sorting and pagination
- **featured-collection.liquid**: Featured products section for homepage

### Asset Files
- **custom-barnhaus.css**: Complete theme styling (1000+ lines of optimized CSS)

### Config Files
- **settings_schema.json**: Defines customizable theme settings in Shopify admin
- **settings_data.json**: Stores theme configuration data

### Locale Files
- **en.default.json**: English translations for all theme text

## 🎨 Customizing Specific Elements

### Change Button Styles

Edit `assets/custom-barnhaus.css`, find the `.btn` class:

```css
.btn {
  padding: 1rem 2rem;
  background: var(--gradient-button);
  color: var(--color-white);
  border-radius: 4px;
  /* Modify these properties */
}
```

### Adjust Product Card Spacing

Find the `.product-grid` class in CSS:

```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem; /* Change this value */
}
```

### Modify Header Height

Find the `.site-header` class:

```css
.header-container {
  padding: 1rem 1.5rem; /* Adjust vertical padding */
}
```

## 🐛 Troubleshooting

### Theme Not Displaying Correctly
1. Clear your browser cache
2. Check that all files were uploaded correctly
3. Verify theme is published in Shopify admin
4. Check browser console for JavaScript errors

### Products Not Showing
1. Ensure you have products in your store
2. Verify collection handles are correct in templates
3. Check product availability settings

### Styling Issues
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear Shopify CDN cache (wait 24 hours or use Shopify CLI)
3. Check for conflicting app CSS

### Cart Not Updating
1. Verify JavaScript is enabled
2. Check browser console for errors
3. Ensure cart template is correctly configured

## 📞 Support

For issues or questions:
- Check Shopify's theme documentation
- Review common Liquid errors
- Test in incognito/private browsing mode
- Contact your Shopify development team

## 📄 License

This theme is proprietary and created specifically for Barnhaus Steel Builders.

## 🚀 Future Enhancements

Potential features to add:
- Quick view product modal
- Advanced filtering options
- Product comparison feature
- Wishlist functionality
- Customer reviews section
- Blog integration
- Newsletter signup
- Multi-currency support
- Language translations

## ✅ Checklist After Installation

- [ ] Upload and publish theme
- [ ] Upload logo and favicon
- [ ] Customize brand colors if needed
- [ ] Set up navigation menu
- [ ] Configure footer links
- [ ] Add social media URLs
- [ ] Test on mobile devices
- [ ] Test cart functionality
- [ ] Test product variants
- [ ] Review SEO settings
- [ ] Enable Shopify analytics
- [ ] Configure shipping settings
- [ ] Set up payment methods
- [ ] Test checkout process

## 📊 Version History

**Version 1.0.0** (Current)
- Initial release
- Complete theme with all core features
- Responsive design
- Product, collection, and cart pages
- Theme customization settings

---

**Built with ❤️ for Barnhaus Steel Builders**

For technical support or custom development, please contact your Shopify development team.

