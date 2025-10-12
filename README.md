# Hypixel Proxy

An Open-Source, customisable Hypixel Proxy.

## Description

This is a Node.js proxy built using `node-minecraft-protocol` for connecting to the Hypixel Network. Using both the Hypixel API - through a custom wrapper at [kqtisa.dev](https://kqtisa.dev). This project is Open-Source, and contributions are welcome.

## Getting Started

### Dependencies
- [Node.js](https://nodejs.org/en/download) v18 or newer
- A Minecraft Client - preferably [Lunar](https://www.lunarclient.com/download) as it automatically runs /locraw checks

### Installing
**Using the ZIP file:**
1. Download the ZIP file
2. Extract to a folder
3. Navigate to the folder in terminal
4. Install Dependencies using `npm install`

**Cloning from GitHub:**
1. Run `git clone https://github.com/nikolaskurs/hypixel-proxy.git`
2. Run `cd hypixel-proxy`
3. Install Dependencies using `npm install`

### Using
1. Navigate to folder in the terminal
2. Run using `node .` or `node main.js`
3. (Optional) Create a shortcut to cmd.exe, and have the "Start In:" set to `cd path/to/your/folder`

## Contributing
Contributions are more than welcome, however please adhere to some rules:

- Keep your code clean, consistent, and well-commented.  
- Use clear and descriptive commit messages.  
- Ensure your changes do not break existing functionality.  
- Test your changes before opening a pull request.  
- Follow the existing project structure and naming conventions.  
- Be respectful to others.
- Know your audience - Minecraft is still a kids game.

If you’re unsure about a change or feature, open an issue first to discuss it before submitting a pull request.  
If you wish for credit inside the project, contact [me](https://discordapp.com/users/1100106252677304350).

### Commenting Guidlines
Please use the below format:

- Main Section Headers   
```// ─── MAIN HEADER ───────────────────────────────────────────────────────```
- Section Headers   
```// --- HEADER ------------------------------------------------------------```
- Extended Explanation
```
/**
 * This is an Extended Explanation.
 * JSDoc Style Comment.
**/
```
- Simple Explanation   
```// This is a Simple Explanation```

If you comment nicely, others can understand and learn from your work!

## Help
If you encounter issues, first check:
- Are you on 1.8.9?
- Is [Mojang](https://x.com/mojangstatus) or [Hypixel](https://status.hypixel.net) down?
- Have I accidentally unplugged my ethernet cable?

If you still encounter problems contact me [here](https://discordapp.com/users/1100106252677304350), or email me at nikolas@kqtisa.dev.  
If project gains popularity I will make a discord server.

## Authors

- **Nikolas 'Kqt' Kurš**  
  [GitHub](https://github.com/nikolaskurs)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details

## Acknowledgments
- [PrismarineJS/node-minecraft-protocol](https://github.com/PrismarineJS/node-minecraft-protocol)
- [Custom API Wrapper](https://api.kqtisa.dev/)
- Marlboro Reds