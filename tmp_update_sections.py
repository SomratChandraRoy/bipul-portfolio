import os

# 1. Projects.tsx
filepath = r'c:\Users\Admin\Documents\Bipul\portfolio\bipul-portfolio\src\components\sections\Projects.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import { GitHubIcon } from '../ui/SocialIcons'", "import { GitHubIcon } from '../ui/SocialIcons'\nimport { PremiumDraggable } from '../ui/PremiumDraggable'")

content = content.replace('''      <motion.div
        className="glass-panel rounded-xl overflow-hidden cursor-pointer group"
        onMouseMove={handleMouseMove}''', '''      <PremiumDraggable
        className="glass-panel rounded-xl overflow-hidden cursor-pointer group"
        onMouseMove={handleMouseMove}''')

content = content.replace('''          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}''', '''          </div>
        </div>
      </PremiumDraggable>
    </motion.div>
  )
}''')

with open(filepath, 'w') as f:
    f.write(content)

# 2. Services.tsx
filepath = r'c:\Users\Admin\Documents\Bipul\portfolio\bipul-portfolio\src\components\sections\Services.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import { services } from '../../data/portfolio'", "import { services } from '../../data/portfolio'\nimport { PremiumDraggable } from '../ui/PremiumDraggable'")

content = content.replace('''              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  className="service-card-glow group relative overflow-hidden glass-panel rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20"
                >''', '''              return (
                <motion.div key={service.title} variants={fadeUp} className="h-full">
                <PremiumDraggable
                  className="service-card-glow group relative overflow-hidden glass-panel rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 h-full"
                >''')

content = content.replace('''                  </p>
                </motion.div>
              )
            })}''', '''                  </p>
                </PremiumDraggable>
                </motion.div>
              )
            })}''')

with open(filepath, 'w') as f:
    f.write(content)

# 3. TechStack.tsx
filepath = r'c:\Users\Admin\Documents\Bipul\portfolio\bipul-portfolio\src\components\sections\TechStack.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import { techStack } from '../../data/portfolio'", "import { techStack } from '../../data/portfolio'\nimport { PremiumDraggable } from '../ui/PremiumDraggable'")

content = content.replace('''                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="bg-secondary rounded-full px-4 py-2 text-sm font-mono text-muted-foreground border border-transparent transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}''', '''                  {cat.items.map((tech) => (
                    <PremiumDraggable key={tech} className="w-auto">
                    <span
                      className="inline-block bg-secondary rounded-full px-4 py-2 text-sm font-mono text-muted-foreground border border-transparent transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 cursor-default"
                    >
                      {tech}
                    </span>
                    </PremiumDraggable>
                  ))}''')

with open(filepath, 'w') as f:
    f.write(content)

# 4. About.tsx
filepath = r'c:\Users\Admin\Documents\Bipul\portfolio\bipul-portfolio\src\components\sections\About.tsx'
with open(filepath, 'r') as f:
    content = f.read()

content = content.replace("import { Download } from 'lucide-react'", "import { Download } from 'lucide-react'\nimport { PremiumDraggable } from '../ui/PremiumDraggable'")

content = content.replace('''            {/* Left: abstract profile visual */}
            <motion.div variants={fadeUp} className="relative">
              <div className="aspect-square rounded-2xl glass-panel p-8 flex items-center justify-center overflow-hidden relative">''', '''            {/* Left: abstract profile visual */}
            <motion.div variants={fadeUp} className="relative">
              <PremiumDraggable>
              <div className="aspect-square rounded-2xl glass-panel p-8 flex items-center justify-center overflow-hidden relative">''')

content = content.replace('''                  <p className="mt-4 text-sm text-muted-foreground font-mono">full-stack developer</p>
                </div>
              </div>
            </motion.div>''', '''                  <p className="mt-4 text-sm text-muted-foreground font-mono">full-stack developer</p>
                </div>
              </div>
              </PremiumDraggable>
            </motion.div>''')

with open(filepath, 'w') as f:
    f.write(content)

print("Updated 4 sections with PremiumDraggable!")
