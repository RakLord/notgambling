
export class Tab {
  constructor(name) {
    this.name = name;
    this.unlocked = false;
  }
  
  show() {
    const tabElement = document.getElementById(this.name);
    if (tabElement) {
      tabElement.classList.remove("hidden");
      tabElement.classList.add("shown");
    }
  }

  hide() {
    const tabElement = document.getElementById(this.name);
    if (tabElement) {
      tabElement.classList.remove("shown");
      tabElement.classList.add("hidden");
    }
  }
}


export class Tabs {
  constructor() {
    this.tabs = {}
    this.currentTab = null;
  }

  addTab(name, label) {
    if (!this.tabs[name]) {
      this.tabs[name] = new Tab(name);

      const currentTabContainer = document.getElementById("currentTabContainer");
      const tabDiv = document.createElement("div");
      tabDiv.id = name;
      tabDiv.classList.add("hidden");
      currentTabContainer.appendChild(tabDiv);

      const sideNavContainer = document.getElementById("sideNavContainer");
      const button = document.createElement("button");
      button.id = `${name}TabButton`;
      button.innerText = label || name;
      button.classList.add("hidden");
      button.addEventListener("click", () => this.switchTab(name));
      sideNavContainer.appendChild(button);
    }
  }

  unlockTab(name) {
    if (this.tabs[name]) {
      this.tabs[name].unlocked = true;

      const button = document.getElementById(`${name}TabButton`);
      if (button) {
        button.classList.remove("hidden");
      }
    }
  }

  switchTab(name){
    console.log(`Switching tab to: ${name}`)
    if (this.tabs[name] && this.tabs[name].unlocked) {
      if (this.currentTab) {
        this.tabs[this.currentTab].hide();
      }

      this.tabs[name].show();
      this.currentTab = name;
    }
  }
}

