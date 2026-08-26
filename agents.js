// ============================================================
// Myntra Wishlist Decision Assistant — Multi-Agent System
// ============================================================

// Shared Types & Constants
const COMPARISON_DIMENSIONS = [
  { key: "price", label: "Price", icon: "💰", type: "numeric", sort: "asc", weight: 0.15 },
  { key: "rating", label: "Rating", icon: "⭐", type: "numeric", sort: "desc", weight: 0.15 },
  { key: "sizeAvailability", label: "Sizes Available", icon: "📏", type: "percentage", sort: "desc", weight: 0.10 },
  { key: "fitScore", label: "Fit Score", icon: "👔", type: "sentiment", sort: "desc", weight: 0.15 },
  { key: "qualityScore", label: "Quality", icon: "✨", type: "sentiment", sort: "desc", weight: 0.15 },
  { key: "customerPhotos", label: "Customer Photos", icon: "📸", type: "numeric", sort: "desc", weight: 0.05 },
  { key: "deliveryDays", label: "Delivery", icon: "🚚", type: "numeric", sort: "asc", weight: 0.10 },
  { key: "returnWindow", label: "Return Window", icon: "↩️", type: "numeric", sort: "desc", weight: 0.05 },
  { key: "discount", label: "Discount", icon: "🏷️", type: "numeric", sort: "desc", weight: 0.10 }
];

const REVIEW_CATEGORIES = [
  { key: "fit", label: "Fit", icon: "👔", emoji: "📐" },
  { key: "quality", label: "Quality", icon: "✨", emoji: "💎" },
  { key: "colourAccuracy", label: "Colour Accuracy", icon: "🎨", emoji: "🎨" },
  { key: "fabric", label: "Fabric", icon: "🧵", emoji: "🧵" },
  { key: "valueForMoney", label: "Value for Money", icon: "💰", emoji: "💸" },
  { key: "commonComplaints", label: "Common Complaints", icon: "⚠️", emoji: "⚠️" }
];

const CONFIDENCE_WEIGHTS = {
  ratingQuality: 0.15,
  reviewTrust: 0.15,
  fitClarity: 0.15,
  qualitySentiment: 0.15,
  colourAccuracy: 0.10,
  sizeAvailability: 0.10,
  deliverySpeed: 0.08,
  returnFriendliness: 0.07,
  priceValue: 0.05
};

// ============================================================
// 1. REVIEW SUMMARIZER AGENT
// ============================================================
class ReviewSummarizerAgent {
  constructor() {
    this.id = "review-summarizer";
  }

  /**
   * Summarise reviews for a single product into structured categories.
   * @param {string} productId
   * @returns {Object} Structured review summary
   */
  summarise(productId) {
    const reviews = getReviewsForProduct(productId);
    const product = getProductById(productId);
    if (!reviews.length || !product) return null;

    const startTime = performance.now();

    const categories = {};
    for (const cat of REVIEW_CATEGORIES) {
      categories[cat.key] = this._analyseCategory(cat.key, reviews);
    }

    const overallSentiment = this._computeOverallSentiment(reviews);

    return {
      productId,
      productName: product.name,
      totalReviewsAnalysed: reviews.length,
      overallSentiment,
      categories,
      linkedReviews: this._buildLinkedReviews(reviews),
      latencyMs: Math.round(performance.now() - startTime)
    };
  }

  _analyseCategory(categoryKey, reviews) {
    const tagMap = {
      fit: "fit",
      quality: "quality",
      colourAccuracy: "colourAccuracy",
      fabric: "fabric",
      valueForMoney: "quality", // we approximate this from rating + price sentiment
      commonComplaints: null    // special handling
    };

    let relevantReviews;
    let summary;
    let sentiment;

    if (categoryKey === "commonComplaints") {
      relevantReviews = reviews.filter(r => r.rating <= 3);
      summary = this._generateComplaintSummary(relevantReviews);
      sentiment = relevantReviews.length > reviews.length * 0.3 ? "negative" : "neutral";
    } else if (categoryKey === "valueForMoney") {
      relevantReviews = reviews.filter(r => {
        const tagVal = r.tags?.quality || "";
        return tagVal.toLowerCase().includes("price") || tagVal.toLowerCase().includes("value") || tagVal.toLowerCase().includes("worth") || r.rating >= 4;
      });
      if (relevantReviews.length === 0) relevantReviews = reviews;
      const avgRating = relevantReviews.reduce((s, r) => s + r.rating, 0) / relevantReviews.length;
      sentiment = avgRating >= 4.2 ? "positive" : avgRating >= 3.5 ? "neutral" : "negative";
      summary = this._generateValueSummary(relevantReviews, sentiment);
    } else {
      const tagKey = tagMap[categoryKey];
      relevantReviews = reviews.filter(r => r.tags && r.tags[tagKey]);
      if (relevantReviews.length === 0) relevantReviews = reviews;

      const tagValues = relevantReviews.map(r => r.tags?.[tagKey] || "").filter(Boolean);
      sentiment = this._analyseSentiment(tagValues, relevantReviews);
      summary = this._generateCategorySummary(categoryKey, tagValues, relevantReviews, sentiment);
    }

    return {
      summary,
      sentiment,
      confidence: Math.min(0.95, 0.5 + (relevantReviews.length / reviews.length) * 0.45),
      reviewIds: relevantReviews.slice(0, 5).map(r => r.id),
      reviewCount: relevantReviews.length
    };
  }

  _analyseSentiment(tagValues, reviews) {
    const positiveTerms = ["perfect", "excellent", "great", "good", "love", "amazing", "premium", "soft", "comfortable", "exact", "vibrant", "breathable", "true", "flattering", "best", "durable"];
    const negativeTerms = ["bad", "poor", "thin", "wrinkle", "narrow", "loose", "different", "fades", "flimsy", "chemical", "uncomfortable", "stiff", "transparent"];

    const allText = tagValues.join(" ").toLowerCase();
    const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

    let posCount = 0, negCount = 0;
    positiveTerms.forEach(t => { if (allText.includes(t)) posCount++; });
    negativeTerms.forEach(t => { if (allText.includes(t)) negCount++; });

    if (avgRating >= 4.0 && posCount > negCount) return "positive";
    if (avgRating < 3.5 || negCount > posCount) return "negative";
    return "neutral";
  }

  _generateCategorySummary(category, tagValues, reviews, sentiment) {
    const topTags = this._getTopTags(tagValues, 3);

    const templates = {
      fit: {
        positive: `Most buyers report a ${topTags[0] || "good"} fit. ${topTags[1] ? `Some describe it as ${topTags[1].toLowerCase()}.` : ""}`,
        neutral: `Fit varies across buyers. Some find it ${topTags[0] || "true to size"}, while others note it ${topTags[1] || "runs differently"}.`,
        negative: `Several buyers report fit issues — ${topTags[0] || "sizing is inconsistent"}. Consider checking the size chart carefully.`
      },
      quality: {
        positive: `Buyers praise the ${topTags[0] || "build quality"}. ${topTags[1] ? `The ${topTags[1].toLowerCase()} is highlighted repeatedly.` : "Overall quality exceeds expectations at this price."}`,
        neutral: `Quality is decent for the price. ${topTags[0] ? `Described as ${topTags[0].toLowerCase()}.` : ""}`,
        negative: `Quality concerns raised by multiple buyers. ${topTags[0] ? `Issues include ${topTags[0].toLowerCase()}.` : ""}`
      },
      colourAccuracy: {
        positive: `Colour matches product photos closely. Buyers describe it as ${topTags[0] || "accurate"}.`,
        neutral: `Colour is mostly accurate, though ${topTags[0] ? `some note it's ${topTags[0].toLowerCase()}` : "slight variations reported"}.`,
        negative: `Several buyers note colour differences from photos. ${topTags[0] ? `Described as ${topTags[0].toLowerCase()}.` : ""}`
      },
      fabric: {
        positive: `Fabric quality is well-received. Described as ${topTags[0] || "comfortable"} ${topTags[1] ? `and ${topTags[1].toLowerCase()}` : ""}.`,
        neutral: `Fabric is acceptable. ${topTags[0] ? `Buyers describe it as ${topTags[0].toLowerCase()}.` : ""}`,
        negative: `Fabric quality is a concern. ${topTags[0] ? `Multiple buyers mention ${topTags[0].toLowerCase()}.` : ""}`
      }
    };

    if (templates[category] && templates[category][sentiment]) {
      return templates[category][sentiment];
    }
    return `Based on ${reviews.length} reviews, the overall sentiment is ${sentiment}.`;
  }

  _generateValueSummary(reviews, sentiment) {
    const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    if (sentiment === "positive") return `Most buyers feel this is excellent value for money with an average rating of ${avgRating.toFixed(1)}. Quality-to-price ratio is praised.`;
    if (sentiment === "neutral") return `Decent value for the price point. Average rating of ${avgRating.toFixed(1)} suggests satisfactory quality.`;
    return `Some buyers question the value proposition. Consider alternatives in a similar price range.`;
  }

  _generateComplaintSummary(negReviews) {
    if (negReviews.length === 0) return "No significant complaints from verified buyers.";

    const allTags = negReviews.flatMap(r => Object.values(r.tags || {})).filter(Boolean);
    const negativeKeywords = allTags.filter(t => {
      const low = t.toLowerCase();
      return low.includes("narrow") || low.includes("thin") || low.includes("wrinkle") || low.includes("loose") ||
        low.includes("fades") || low.includes("smell") || low.includes("flimsy") || low.includes("transparent") ||
        low.includes("large") || low.includes("small") || low.includes("different") || low.includes("average") ||
        low.includes("stiff") || low.includes("chemical") || low.includes("uncomfortable");
    });

    if (negativeKeywords.length > 0) {
      const uniqueComplaints = [...new Set(negativeKeywords.map(k => k.toLowerCase()))].slice(0, 3);
      return `Common issues include: ${uniqueComplaints.join(", ")}. Reported by ${negReviews.length} out of total reviews.`;
    }
    return `${negReviews.length} review(s) mention minor issues. No recurring pattern of complaints detected.`;
  }

  _getTopTags(tagValues, count) {
    const freq = {};
    tagValues.forEach(t => {
      const normalized = t.trim();
      freq[normalized] = (freq[normalized] || 0) + 1;
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([tag]) => tag);
  }

  _computeOverallSentiment(reviews) {
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    if (avg >= 4.2) return "positive";
    if (avg >= 3.5) return "neutral";
    return "negative";
  }

  _buildLinkedReviews(reviews) {
    const linked = {};
    reviews.forEach(r => {
      linked[r.id] = {
        userName: r.userName,
        rating: r.rating,
        verified: r.verified,
        date: r.date,
        title: r.title,
        text: r.text,
        photos: r.photos
      };
    });
    return linked;
  }
}

// ============================================================
// 2. COMPARISON AGENT
// ============================================================
class ComparisonAgent {
  constructor() {
    this.id = "comparison";
  }

  /**
   * Compare 2-4 products across all dimensions.
   * @param {string[]} productIds
   * @returns {Object} Comparison matrix
   */
  compare(productIds) {
    if (productIds.length < 2 || productIds.length > 4) {
      throw new Error("Select 2-4 products to compare");
    }

    const startTime = performance.now();
    const products = productIds.map(id => getProductById(id)).filter(Boolean);
    const matrix = {};

    for (const dim of COMPARISON_DIMENSIONS) {
      const values = products.map(p => this._extractDimensionValue(dim, p));
      const best = this._findBest(values, dim.sort);
      const worst = this._findWorst(values, dim.sort);

      matrix[dim.key] = {
        label: dim.label,
        icon: dim.icon,
        weight: dim.weight,
        values: products.map((p, i) => ({
          productId: p.id,
          raw: values[i],
          display: this._formatValue(dim, values[i], p),
          isBest: values[i] === best,
          isWorst: values[i] === worst
        }))
      };
    }

    return {
      productIds,
      products: products.map(p => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        image: p.image,
        price: p.price
      })),
      matrix,
      latencyMs: Math.round(performance.now() - startTime)
    };
  }

  _extractDimensionValue(dim, product) {
    const reviews = getReviewsForProduct(product.id);
    switch (dim.key) {
      case "price": return product.price;
      case "rating": return product.rating;
      case "sizeAvailability":
        return Math.round((product.sizesInStock.length / product.sizes.length) * 100);
      case "fitScore": return this._computeFitScore(reviews);
      case "qualityScore": return this._computeQualityScore(reviews);
      case "customerPhotos":
        return reviews.reduce((sum, r) => sum + (r.photos || 0), 0);
      case "deliveryDays": return product.deliveryDays;
      case "returnWindow": return product.returnDays;
      case "discount": return product.discount;
      default: return 0;
    }
  }

  _computeFitScore(reviews) {
    if (!reviews.length) return 50;
    const fitTags = reviews.map(r => r.tags?.fit).filter(Boolean);
    const positiveTerms = ["perfect", "true", "flattering", "comfy", "good"];
    let pos = 0;
    fitTags.forEach(t => {
      if (positiveTerms.some(p => t.toLowerCase().includes(p))) pos++;
    });
    return Math.round((pos / Math.max(fitTags.length, 1)) * 100);
  }

  _computeQualityScore(reviews) {
    if (!reviews.length) return 50;
    const qualityTags = reviews.map(r => r.tags?.quality).filter(Boolean);
    const positiveTerms = ["excellent", "premium", "great", "good", "top"];
    let pos = 0;
    qualityTags.forEach(t => {
      if (positiveTerms.some(p => t.toLowerCase().includes(p))) pos++;
    });
    return Math.round((pos / Math.max(qualityTags.length, 1)) * 100);
  }

  _findBest(values, sortDirection) {
    return sortDirection === "asc" ? Math.min(...values) : Math.max(...values);
  }

  _findWorst(values, sortDirection) {
    return sortDirection === "asc" ? Math.max(...values) : Math.min(...values);
  }

  _formatValue(dim, value, product) {
    switch (dim.key) {
      case "price": return `₹${value.toLocaleString('en-IN')}`;
      case "rating": return `${value} ★`;
      case "sizeAvailability": return `${value}%`;
      case "fitScore": return `${value}/100`;
      case "qualityScore": return `${value}/100`;
      case "customerPhotos": return `${value} photos`;
      case "deliveryDays": return `${value} days`;
      case "returnWindow": return `${value} days`;
      case "discount": return `${value}% off`;
      default: return String(value);
    }
  }
}

// ============================================================
// 3. CONFIDENCE SCORER AGENT
// ============================================================
class ConfidenceScorerAgent {
  constructor() {
    this.id = "confidence-scorer";
  }

  /**
   * Generate a confidence card for a product.
   * @param {string} productId
   * @returns {Object} Confidence card data
   */
  score(productId) {
    const product = getProductById(productId);
    const reviews = getReviewsForProduct(productId);
    if (!product) return null;

    const startTime = performance.now();

    const dimensions = {
      ratingQuality: this._scoreRating(product),
      reviewTrust: this._scoreReviewTrust(reviews),
      fitClarity: this._scoreFitClarity(reviews),
      qualitySentiment: this._scoreQuality(reviews),
      colourAccuracy: this._scoreColourAccuracy(reviews),
      sizeAvailability: this._scoreSizeAvailability(product),
      deliverySpeed: this._scoreDelivery(product),
      returnFriendliness: this._scoreReturnPolicy(product),
      priceValue: this._scorePriceValue(product)
    };

    const totalScore = Math.round(
      Object.entries(dimensions).reduce((sum, [key, val]) => {
        return sum + val.score * (CONFIDENCE_WEIGHTS[key] || 0);
      }, 0)
    );

    const label = totalScore >= 80 ? "Very High" :
                  totalScore >= 65 ? "High" :
                  totalScore >= 45 ? "Medium" : "Low";

    const color = totalScore >= 80 ? "var(--confidence-very-high)" :
                  totalScore >= 65 ? "var(--confidence-high)" :
                  totalScore >= 45 ? "var(--confidence-medium)" : "var(--confidence-low)";

    // Compute highlights
    const sortedDims = Object.entries(dimensions).sort((a, b) => b[1].score - a[1].score);
    const strengths = sortedDims.slice(0, 3).map(([key, val]) => val.label);
    const concerns = sortedDims.filter(([, val]) => val.score < 60)
      .slice(0, 2)
      .map(([key, val]) => val.concern || val.label);

    return {
      productId,
      product: {
        name: product.name,
        brand: product.brand,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        discount: product.discount,
        rating: product.rating,
        reviewCount: product.reviewCount
      },
      totalScore,
      label,
      color,
      dimensions,
      attributes: this._buildAttributes(product, reviews),
      strengths,
      concerns,
      latencyMs: Math.round(performance.now() - startTime)
    };
  }

  _scoreRating(product) {
    const score = Math.round(Math.min(100, (product.rating / 5) * 100));
    return { score, label: `Rating: ${product.rating}/5`, value: `${product.rating} ★`, concern: "Low rating" };
  }

  _scoreReviewTrust(reviews) {
    const verified = reviews.filter(r => r.verified).length;
    const withPhotos = reviews.filter(r => r.photos > 0).length;
    const ratio = reviews.length > 0 ? verified / reviews.length : 0;
    const photoRatio = reviews.length > 0 ? withPhotos / reviews.length : 0;
    const score = Math.round((ratio * 70) + (photoRatio * 30));
    return { score, label: `${verified} verified reviews`, value: `${reviews.length} reviews`, concern: "Few verified reviews" };
  }

  _scoreFitClarity(reviews) {
    const fitTags = reviews.map(r => r.tags?.fit).filter(Boolean);
    const consistent = ["true to size", "perfect fit", "perfect", "true"];
    const matchCount = fitTags.filter(t => consistent.some(c => t.toLowerCase().includes(c))).length;
    const score = fitTags.length > 0 ? Math.round((matchCount / fitTags.length) * 100) : 50;
    return { score, label: "Consistent fit feedback", value: fitTags[0] || "N/A", concern: "Inconsistent fit reports" };
  }

  _scoreQuality(reviews) {
    const qualityTags = reviews.map(r => r.tags?.quality).filter(Boolean);
    const positive = ["excellent", "premium", "great", "good", "top"];
    const matchCount = qualityTags.filter(t => positive.some(p => t.toLowerCase().includes(p))).length;
    const score = qualityTags.length > 0 ? Math.round((matchCount / qualityTags.length) * 100) : 50;
    return { score, label: "Positive quality feedback", value: qualityTags[0] || "N/A", concern: "Quality concerns raised" };
  }

  _scoreColourAccuracy(reviews) {
    const colourTags = reviews.map(r => r.tags?.colourAccuracy).filter(Boolean);
    const accurate = ["exact", "as shown", "vibrant", "match", "accurate", "rich"];
    const matchCount = colourTags.filter(t => accurate.some(a => t.toLowerCase().includes(a))).length;
    const score = colourTags.length > 0 ? Math.round((matchCount / colourTags.length) * 100) : 60;
    return { score, label: "Colour matches photos", value: colourTags[0] || "N/A", concern: "Colour differs from photos" };
  }

  _scoreSizeAvailability(product) {
    const ratio = product.sizesInStock.length / product.sizes.length;
    const score = Math.round(ratio * 100);
    return { score, label: `${product.sizesInStock.length}/${product.sizes.length} sizes in stock`, value: `${Math.round(ratio * 100)}%`, concern: "Limited sizes available" };
  }

  _scoreDelivery(product) {
    const score = product.deliveryDays <= 2 ? 95 :
                  product.deliveryDays <= 3 ? 80 :
                  product.deliveryDays <= 5 ? 60 : 40;
    return { score, label: `Delivers in ${product.deliveryDays} days`, value: `${product.deliveryDays} days`, concern: "Slow delivery" };
  }

  _scoreReturnPolicy(product) {
    const score = product.returnDays >= 30 ? 90 :
                  product.returnDays >= 15 ? 65 : 40;
    return { score, label: `${product.returnDays}-day returns`, value: `${product.returnDays} days`, concern: "Short return window" };
  }

  _scorePriceValue(product) {
    const score = Math.round(Math.min(100, product.discount * 2));
    return { score, label: `${product.discount}% discount`, value: `${product.discount}% off`, concern: "Low discount" };
  }

  _buildAttributes(product, reviews) {
    const photoCount = reviews.reduce((sum, r) => sum + (r.photos || 0), 0);
    const fitTags = reviews.map(r => r.tags?.fit).filter(Boolean);
    const qualityTags = reviews.map(r => r.tags?.quality).filter(Boolean);
    const colourTags = reviews.map(r => r.tags?.colourAccuracy).filter(Boolean);

    return [
      { label: "Rating", value: `${product.rating} ★`, icon: "⭐", sentiment: product.rating >= 4.0 ? "positive" : product.rating >= 3.5 ? "warning" : "negative" },
      { label: "Reviews", value: `${product.reviewCount}`, icon: "💬", sentiment: product.reviewCount >= 500 ? "positive" : product.reviewCount >= 100 ? "info" : "warning" },
      { label: "Photos", value: `${photoCount} buyer photos`, icon: "📸", sentiment: photoCount >= 5 ? "positive" : "info" },
      { label: "Fit", value: fitTags[0] || "N/A", icon: "📐", sentiment: "info" },
      { label: "Quality", value: qualityTags[0] || "N/A", icon: "💎", sentiment: "positive" },
      { label: "Colour", value: colourTags[0] || "N/A", icon: "🎨", sentiment: "info" },
      { label: "Sizes", value: `${product.sizesInStock.length}/${product.sizes.length} available`, icon: "📏", sentiment: product.sizesInStock.length === product.sizes.length ? "positive" : "warning" },
      { label: "Delivery", value: `${product.deliveryDays} days`, icon: "🚚", sentiment: product.deliveryDays <= 3 ? "positive" : "warning" },
      { label: "Returns", value: `${product.returnDays} days`, icon: "↩️", sentiment: product.returnDays >= 30 ? "positive" : "warning" },
      { label: "Discount", value: `${product.discount}% off`, icon: "🏷️", sentiment: product.discount >= 40 ? "positive" : "info" }
    ];
  }
}

// ============================================================
// 4. RECOMMENDATION AGENT
// ============================================================
class RecommendationAgent {
  constructor() {
    this.id = "recommendation";
  }

  /**
   * Generate a recommendation from comparison + confidence data.
   * @param {Object} comparisonResult - from ComparisonAgent
   * @param {Object[]} confidenceCards - from ConfidenceScorerAgent
   * @returns {Object} Recommendation
   */
  recommend(comparisonResult, confidenceCards) {
    const startTime = performance.now();

    // Compute weighted scores per product
    const productScores = comparisonResult.products.map(p => {
      let score = 0;
      const confidenceCard = confidenceCards.find(c => c.productId === p.id);

      // Score from comparison dimensions
      for (const [dimKey, dimData] of Object.entries(comparisonResult.matrix)) {
        const productValue = dimData.values.find(v => v.productId === p.id);
        if (productValue?.isBest) score += dimData.weight * 100;
        else if (productValue?.isWorst) score += dimData.weight * 20;
        else score += dimData.weight * 60;
      }

      // Blend with confidence score
      if (confidenceCard) {
        score = score * 0.6 + confidenceCard.totalScore * 0.4;
      }

      return { productId: p.id, product: p, score: Math.round(score), confidenceScore: confidenceCard?.totalScore || 0 };
    });

    // Sort descending
    productScores.sort((a, b) => b.score - a.score);

    const winner = productScores[0];
    const runnerUp = productScores.length > 1 ? productScores[1] : null;

    // Generate reasoning
    const reasoning = this._generateReasoning(winner, runnerUp, comparisonResult);

    return {
      winnerId: winner.productId,
      winnerProduct: winner.product,
      winnerScore: winner.score,
      label: "Best Overall Choice",
      reasoning,
      runnerUp: runnerUp ? {
        id: runnerUp.productId,
        product: runnerUp.product,
        score: runnerUp.score,
        note: this._generateRunnerUpNote(runnerUp, winner, comparisonResult)
      } : null,
      allScores: productScores,
      latencyMs: Math.round(performance.now() - startTime)
    };
  }

  _generateReasoning(winner, runnerUp, comparison) {
    const product = getProductById(winner.productId);
    if (!product) return "";

    // Find dimensions where the winner is best
    const winDimensions = [];
    for (const [key, dim] of Object.entries(comparison.matrix)) {
      const val = dim.values.find(v => v.productId === winner.productId);
      if (val?.isBest) winDimensions.push(dim.label.toLowerCase());
    }

    const winStr = winDimensions.length > 0
      ? winDimensions.slice(0, 3).join(", ")
      : "overall balance of features";

    let reasoning = `The ${product.brand} ${product.name} stands out as the best overall choice, leading in ${winStr}.`;

    if (product.rating >= 4.3) {
      reasoning += ` With a strong ${product.rating}★ rating from ${product.reviewCount}+ reviews, buyers consistently praise its quality.`;
    } else {
      reasoning += ` It offers solid performance across key dimensions that matter most for confident purchasing.`;
    }

    if (product.discount >= 40) {
      reasoning += ` At ${product.discount}% off, it also offers excellent value for money.`;
    }

    return reasoning;
  }

  _generateRunnerUpNote(runnerUp, winner, comparison) {
    const product = getProductById(runnerUp.productId);
    if (!product) return "";

    const advantages = [];
    for (const [key, dim] of Object.entries(comparison.matrix)) {
      const runnerVal = dim.values.find(v => v.productId === runnerUp.productId);
      const winnerVal = dim.values.find(v => v.productId === winner.productId);
      if (runnerVal?.isBest && !winnerVal?.isBest) {
        advantages.push(dim.label.toLowerCase());
      }
    }

    if (advantages.length > 0) {
      return `Better ${advantages.slice(0, 2).join(" and ")}, but lower overall confidence score.`;
    }
    return `A close alternative worth considering.`;
  }
}

// ============================================================
// 5. ORCHESTRATOR AGENT
// ============================================================
class OrchestratorAgent {
  constructor() {
    this.id = "orchestrator";
    this.comparisonAgent = new ComparisonAgent();
    this.reviewAgent = new ReviewSummarizerAgent();
    this.confidenceAgent = new ConfidenceScorerAgent();
    this.recommendationAgent = new RecommendationAgent();
  }

  /**
   * Full "Help Me Choose" pipeline.
   * @param {string[]} productIds
   * @returns {Object} Complete comparison result
   */
  helpMeChoose(productIds) {
    const startTime = performance.now();

    // Step 1: Run comparison
    const comparison = this.comparisonAgent.compare(productIds);

    // Step 2: Run review summaries (parallel simulation)
    const reviewSummaries = {};
    productIds.forEach(id => {
      reviewSummaries[id] = this.reviewAgent.summarise(id);
    });

    // Step 3: Run confidence scoring
    const confidenceCards = productIds.map(id => this.confidenceAgent.score(id)).filter(Boolean);

    // Step 4: Generate recommendation
    const recommendation = this.recommendationAgent.recommend(comparison, confidenceCards);

    return {
      comparison,
      reviewSummaries,
      confidenceCards: confidenceCards.reduce((acc, c) => { acc[c.productId] = c; return acc; }, {}),
      recommendation,
      totalLatencyMs: Math.round(performance.now() - startTime)
    };
  }

  /**
   * Get AI Review Summary for a single product.
   * @param {string} productId
   * @returns {Object} Review summary
   */
  getReviewSummary(productId) {
    return this.reviewAgent.summarise(productId);
  }

  /**
   * Get Confidence Card for a single product.
   * @param {string} productId
   * @returns {Object} Confidence card
   */
  getConfidenceCard(productId) {
    return this.confidenceAgent.score(productId);
  }
}

// ============================================================
// Initialise Global Orchestrator
// ============================================================
const orchestrator = new OrchestratorAgent();
