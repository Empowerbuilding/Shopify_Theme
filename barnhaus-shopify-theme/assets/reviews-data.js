/**
 * Customer Reviews Data
 * Loaded from reviews export
 */

window.ReviewsData = {
  reviews: [
    {
      author: "Jeanette Rivas",
      rating: 5,
      body: "Fast response, helpful, great customer service",
      published_at: "2025-10-03T00:00:00Z"
    },
    {
      author: "Amber",
      rating: 5,
      body: "I literally should have come here before wasting money anywhere else!! The plan is exactly what I need and has all the same specs as the online shops charging exorbitant fees! I love doing business with small business owners. You will NOT be disappointed!",
      published_at: "2024-09-13T00:00:00Z"
    },
    {
      author: "Arundel Hunte",
      rating: 5,
      body: "The products exceed my expectations!",
      published_at: "2024-08-29T00:00:00Z"
    },
    {
      author: "Robert",
      rating: 5,
      body: "Beautiful product, design and love these homes",
      published_at: "2024-08-25T00:00:00Z"
    },
    {
      author: "Elijah",
      rating: 5,
      body: "When my wife showed me this listing I was immediately intrigued. My retirement is coming up and we had always talked about building our own place, but we figured that the process would be too cumbersome and expensive. Luckily Spring Creek was 95% of the way towards our dream house. I contacted Barnhaus on a whim to see if the designs are set in stone. Within hours I heard back from Michael. He was very patient with me and after a few back and forth messages said that he was going to get to work. Within a day I heard back and what he showed was utter perfection for what we wanted. The design has been sent out to contractors for bids and all of them said the blueprints were professional and would make the process much easier for them and cheaper for us. We cannot wait to move in!",
      published_at: "2024-07-10T00:00:00Z"
    },
    {
      author: "carlos",
      rating: 5,
      body: "This plan really exceeded my expectations! I'm in the process of building my dream home, This plan is making it so easy. Definitely recommend",
      published_at: "2024-07-08T00:00:00Z"
    },
    {
      author: "Jessica",
      rating: 5,
      body: "My family is working on a project to build our dream getaway on some property we've purchased. This design is well laid out and functional. Impressive level of detail and super affordable. I highly recommend to anyone looking to build or GC their own project.",
      published_at: "2024-07-08T00:00:00Z"
    },
    {
      author: "Mitchell",
      rating: 5,
      body: "I recently purchased construction plans for a Barndominium from Barnhaus. Overall, I found them to be a valuable asset for my project, especially considering the affordable price point.",
      published_at: "2024-07-07T00:00:00Z"
    },
    {
      author: "Currie",
      rating: 5,
      body: "This plan really exceeded my expectations! The amount of detail within these pages was far beyond what I expected at this price point. My wife and I are in the process of clearing our land and cannot wait to begin building this plan for our family gatherings!",
      published_at: "2024-06-20T00:00:00Z"
    },
    {
      author: "Sign in with Apple user",
      rating: 5,
      body: "I couldn't be happier with the plans I received. The seller provided an incredibly detailed description but the blueprints I received exceeded my expectations. The quality of the plans was outstanding, capturing every detail with remarkable precision and realism. Additionally, the price was unbeatable. I had shopped around and this was by far the best value I found. The seller's attention to detail in the blueprints, combined with the affordability of the service, made this a fantastic purchase. I highly recommend this to anyone looking for high-quality 3D render plans. I'm excited to start building with them soon!",
      published_at: "2024-06-12T00:00:00Z"
    }
  ],

  /**
   * Format date for display
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },

  /**
   * Get initials from name
   */
  getInitials(name) {
    if (!name) return '?';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  },

  /**
   * Generate star rating HTML
   */
  getStars(rating) {
    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsHTML += '<svg class="star-icon filled" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      } else {
        starsHTML += '<svg class="star-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
      }
    }
    return starsHTML;
  },

  /**
   * Get a subset of reviews
   */
  getFeaturedReviews(count = 6) {
    return this.reviews.slice(0, count);
  }
};

