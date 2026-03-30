import os

filepath = r'c:\Users\Admin\Documents\Bipul\portfolio\bipul-portfolio\src\components\sections\Hero.tsx'

with open(filepath, 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { PremiumDraggable } from '../ui/PremiumDraggable'\n"
content = content.replace("import { tallyFormId } from '../../data/portfolio'", "import { tallyFormId } from '../../data/portfolio'\n" + import_stmt)

# Wrap Eyebrow pill
content = content.replace('''          {/* Eyebrow Pill */}
          <motion.div''', '''          {/* Eyebrow Pill */}
          <PremiumDraggable className="w-auto">
            <motion.div''')

content = content.replace('''            </span>
          </motion.div>''', '''            </span>
            </motion.div>
          </PremiumDraggable>''')

# Wrap majestic typography header
content = content.replace('''          {/* Majestic Typography Header */}
          <motion.h1''', '''          {/* Majestic Typography Header */}
          <PremiumDraggable className="w-auto">
            <motion.h1''')
content = content.replace('''            <span className="text-slate-200">with clean architecture<span className="text-[#4b83fb]">.</span></span>
          </motion.h1>''', '''            <span className="text-slate-200">with clean architecture<span className="text-[#4b83fb]">.</span></span>
            </motion.h1>
          </PremiumDraggable>''')

# Wrap subtitle
content = content.replace('''          {/* Subtitle Description */}
          <motion.p''', '''          {/* Subtitle Description */}
          <PremiumDraggable className="w-auto">
            <motion.p''')
content = content.replace('''performance products for growing businesses.
          </motion.p>''', '''performance products for growing businesses.
            </motion.p>
          </PremiumDraggable>''')

# Wrap CTA Primary Action Row buttons - wait, links inside PremiumDraggable? Yes.
# Oh, the CTA row has a flex layout, wrapping individual links is better or the whole row.
# Let's wrap the whole row.
content = content.replace('''          {/* CTA Primary Action Row */}
          <motion.div''', '''          {/* CTA Primary Action Row */}
          <PremiumDraggable className="w-auto z-50">
            <motion.div''')
content = content.replace('''            </a>
          </motion.div>''', '''            </a>
            </motion.div>
          </PremiumDraggable>''')

# Wrap Technology Hierarchy Layer Pills - The whole flex container.
content = content.replace('''          {/* Technology Hierarchy Layer Pills */}
          <motion.div''', '''          {/* Technology Hierarchy Layer Pills */}
          <PremiumDraggable className="w-auto">
            <motion.div''')

content = content.replace('''              </div>
            ))}
          </motion.div>''', '''              </div>
            ))}
            </motion.div>
          </PremiumDraggable>''')

with open(filepath, 'w') as f:
    f.write(content)

print("Updated Hero.tsx")
