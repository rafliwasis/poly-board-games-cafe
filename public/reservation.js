(function () {
  /** @typedef {{ id: string, label: string, capacity: number, zone: string, shape: string }} CafeTable */

  /** @type {ReadonlyArray<CafeTable>} */
  const tables = Object.freeze([
    { id: "T1", label: "Table 1", capacity: 2, zone: "Window nook", shape: "round" },
    { id: "T2", label: "Table 2", capacity: 4, zone: "Window side", shape: "square" },
    { id: "T3", label: "Table 3", capacity: 4, zone: "Game shelf", shape: "square" },
    { id: "T4", label: "Table 4", capacity: 6, zone: "Main room", shape: "long" },
    { id: "T5", label: "Table 5", capacity: 6, zone: "Main room", shape: "long" },
    { id: "T6", label: "Table 6", capacity: 8, zone: "Group corner", shape: "large" }
  ]);

  const timeSlots = Object.freeze(["12:00", "14:00", "16:00", "18:00", "20:00", "22:00"]);
  // Add Poly's international-format number (digits only) when it is confirmed.
  const cafeWhatsAppNumber = "";
  const occupiedByTime = Object.freeze({
    "12:00": ["T1"],
    "14:00": ["T3"],
    "16:00": ["T2", "T5"],
    "18:00": ["T1", "T4"],
    "20:00": ["T2", "T6"],
    "22:00": ["T5"]
  });

  const state = {
    selectedTime: "18:00",
    selectedTableId: ""
  };

  const form = document.querySelector("#booking-form");
  const dateInput = document.querySelector("#booking-date");
  const partyInput = document.querySelector("#party-size");
  const durationInput = document.querySelector("#duration");
  const timeSlotWrap = document.querySelector("#time-slots");
  const floorTables = document.querySelector("#floor-tables");
  const availabilityNote = document.querySelector("#availability-note");
  const summaryTitle = document.querySelector("#summary-title");
  const summaryCopy = document.querySelector("#summary-copy");
  const errorMessage = document.querySelector("#form-error");
  const successMessage = document.querySelector("#booking-success");

  if (!form || !dateInput || !partyInput || !durationInput || !timeSlotWrap || !floorTables) return;

  function toLocalISO(date) {
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
  }

  function setInitialDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    dateInput.min = toLocalISO(today);
    dateInput.value = toLocalISO(tomorrow);
  }

  function getOccupiedTableIds() {
    const occupied = new Set(occupiedByTime[state.selectedTime] || []);
    const selectedDate = new Date(`${dateInput.value}T12:00:00`);

    if ([0, 6].includes(selectedDate.getDay()) && ["18:00", "20:00"].includes(state.selectedTime)) {
      occupied.add("T3");
    }

    return occupied;
  }

  function isTableAvailable(table) {
    return table.capacity >= Number(partyInput.value) && !getOccupiedTableIds().has(table.id);
  }

  function renderTimes() {
    timeSlotWrap.replaceChildren(...timeSlots.map(time => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `time-slot${state.selectedTime === time ? " active" : ""}`;
      button.dataset.time = time;
      button.setAttribute("aria-pressed", String(state.selectedTime === time));
      button.textContent = time;
      button.addEventListener("click", () => {
        state.selectedTime = time;
        state.selectedTableId = "";
        render();
      });
      return button;
    }));
  }

  function renderTables() {
    const occupied = getOccupiedTableIds();
    const partySize = Number(partyInput.value);
    let availableCount = 0;

    floorTables.replaceChildren(...tables.map(table => {
      const tooSmall = table.capacity < partySize;
      const unavailable = occupied.has(table.id) || tooSmall;
      const selected = state.selectedTableId === table.id;
      if (!unavailable) availableCount += 1;

      const button = document.createElement("button");
      button.type = "button";
      button.className = `cafe-table table-${table.id.toLowerCase()} table-${table.shape}${selected ? " selected" : ""}${unavailable ? " unavailable" : ""}`;
      button.disabled = unavailable;
      button.dataset.tableId = table.id;
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", unavailable
        ? `${table.label}, unavailable${tooSmall ? ` for ${partySize} players` : " at this time"}`
        : `${table.label}, ${table.zone}, seats ${table.capacity}`);

      const label = document.createElement("strong");
      label.textContent = table.id;
      const seats = document.createElement("small");
      seats.textContent = unavailable ? (tooSmall ? "Too small" : "Taken") : `${table.capacity} seats`;
      button.append(label, seats);

      if (!unavailable) {
        button.addEventListener("click", () => {
          state.selectedTableId = table.id;
          renderTables();
          renderSummary();
          hideMessages();
        });
      }

      return button;
    }));

    availabilityNote.textContent = `${availableCount} suitable ${availableCount === 1 ? "table" : "tables"} shown for ${partySize} players at ${state.selectedTime}. Availability is sample data for this mockup.`;
  }

  function formatDate(value) {
    if (!value) return "your chosen date";
    return new Intl.DateTimeFormat("en-ID", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(`${value}T12:00:00`));
  }

  function getSelectedTable() {
    return tables.find(table => table.id === state.selectedTableId);
  }

  function renderSummary() {
    const table = getSelectedTable();
    if (!table) {
      summaryTitle.textContent = "Ready when you are";
      summaryCopy.textContent = "Choose an available table to complete your booking request.";
      return;
    }

    const partySize = Number(partyInput.value);
    const duration = Number(durationInput.value);
    summaryTitle.textContent = `${table.label} is your pick`;
    summaryCopy.textContent = `${formatDate(dateInput.value)} at ${state.selectedTime} · ${partySize} players · ${duration} hours · ${table.zone}`;
  }

  function hideMessages() {
    errorMessage.hidden = true;
    successMessage.hidden = true;
  }

  function render() {
    const selected = getSelectedTable();
    if (selected && !isTableAvailable(selected)) state.selectedTableId = "";
    renderTimes();
    renderTables();
    renderSummary();
    hideMessages();
  }

  function buildWhatsAppMessage(data, table) {
    const notes = data.get("notes").trim();
    const lines = [
      "Hello Poly! I'd like to request a table reservation.",
      "",
      `Name: ${data.get("guestName").trim()}`,
      `WhatsApp: ${data.get("guestPhone").trim()}`,
      `Date: ${formatDate(data.get("date"))}`,
      `Start time: ${state.selectedTime}`,
      `Duration: ${data.get("duration")} hours`,
      `Party size: ${data.get("partySize")} players`,
      `Table preference: ${table.label} (${table.zone})`
    ];

    if (notes) lines.push(`Notes: ${notes}`);
    lines.push("", "Please confirm whether this table and time are available. Thank you!");
    return lines.join("\n");
  }

  dateInput.addEventListener("change", () => {
    state.selectedTableId = "";
    render();
  });
  partyInput.addEventListener("change", () => {
    state.selectedTableId = "";
    render();
  });
  durationInput.addEventListener("change", renderSummary);

  form.addEventListener("submit", event => {
    event.preventDefault();
    hideMessages();

    if (!form.checkValidity()) {
      form.reportValidity();
      errorMessage.textContent = "Please complete your date and contact details.";
      errorMessage.hidden = false;
      return;
    }

    const table = getSelectedTable();
    if (!table) {
      errorMessage.textContent = "Please choose an available table before continuing.";
      errorMessage.hidden = false;
      document.querySelector("#floor-plan").scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const data = new FormData(form);
    const message = buildWhatsAppMessage(data, table);
    const recipient = cafeWhatsAppNumber ? `/${cafeWhatsAppNumber}` : "/";
    const url = `https://wa.me${recipient}?text=${encodeURIComponent(message)}`;
    successMessage.hidden = false;
    successMessage.focus();
    window.open(url, "_blank", "noopener,noreferrer");
  });

  setInitialDate();
  render();
})();
