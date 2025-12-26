# Design Brief from Gemini Conversation

## Vision: Option E - Pocket StoryMarket + Option D - Campfire Circles

**Core Aesthetic:**
- Dark navy backgrounds (#1e293b, #0f172a)
- Warm ember oranges (#fb923c, #ea580c)  
- Card-based collectible design
- Illustrated story covers
- Category badges (FAMILY, SCHOOL, FREE, EDUCATOR)
- Narrator badges ("Narrated by Dad")
- Circle/group system for families

## 5 Agent Implementation Blocks

### Agent 1 – Home & Card System
- Card-based home with dark navy theme
- Gradient orange "+" button
- Rounded cards with heart icon
- Each card: cover image, title, subtitle, narrator badge, circle label, price
- Layout: hero card at top + horizontal carousels below
- Categories: "New in Your Circles", "Bedtime", "Silly Voices", "Featured Market"
- Responsive: mobile-first, more cards per row on tablet

### Agent 2 – Circles (Campfire Layer)
- Circles = groups (family/class/club) that own/share stories
- Each circle: cover banner, campfire icon, name, tagline, member avatars with roles
- Inside circle: tabs for Stories, Gifts, Activity
- Flows: "Create Circle" and "Join by Code"
- G-rated defaults, clear role selection

### Agent 3 – Creator / Publishing Flow
- "+" button opens 3-step wizard: Details → Content → Publish
- Step 1: title, tagline, length slider (Short & Sweet ↔ Epic Journey), AI toggle
- Step 2: cover template, art upload, text editor, audio record, preview
- Step 3: set price (1-2 credits), pick beneficiary child/circle, visibility
- Drafts persist
- Clear message: withdrawals go to verified child accounts only

### Agent 4 – Marketplace & Gifting
- Marketplace reuses card component
- Grid + carousels (Bedtime, Adventure, Dad's Messages, Top Gifted)
- Story detail: large card, description, preview audio, rating, circles, Buy/Gift
- Gifting: select child/circle → confirm → update both transactions
- "Kids Impact / Future Fund" meter visible

### Agent 5 – Profile, Legacy, Watch
- Profile: avatar, level, badges, stats (created, owned, kids helped, circles)
- Legacy Vault card: long-term storage, future fund (gentle tone)
- Watch UI: mini deck of 3-5 cards
- Story of the Day, Last Played, Circle Pick
- Title + play/pause only, swipe to change, no editing
- Audio-first, same G-rated constraints

## Key Design Elements from Screenshots

1. **Story Cards**: Illustrated covers with category badges (FAMILY, SCHOOL)
2. **Memory Count**: Circle badge with number (○ 2, ○ 1)
3. **NOW PLAYING**: Orange badge in reader
4. **Progress Bar**: Orange indicator with timer
5. **Create Modal**: Title, tagline, slider, AI toggle, progress dots
6. **Dark Theme**: Consistent navy + orange throughout
7. **Compact Grid**: 2-4 columns of tightly-packed cards

---

*Implement these 5 agents to match the Gemini vision*




