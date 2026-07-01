import { useState } from 'react';

interface HeaderProps {
  tableNumber: number | null;
  onSetTable: (n: number) => void;

  callingStaff: boolean;
  staffCalled: boolean;
  onCallStaff: () => void;
}

export function Header({

  tableNumber,
  onSetTable,

  callingStaff,
  staffCalled,
  onCallStaff,

}: HeaderProps) {
  const [manualValue, setManualValue] = useState('');

  return (
    <header className="header">
      <div className="brandrow">

<div className="brand">

    <div className="mark">
        Rizky's DuFun
    </div>

    <div className="tag">
        Board Game Café · Table Service
    </div>

</div>

<div className="header-actions">

    <button

        className="call-staff-header-btn"

        disabled={callingStaff || staffCalled}

        onClick={onCallStaff}

    >

        {

            staffCalled

                ? "✅ Staff Notified"

                : callingStaff

                ? "Calling..."

                : "🔔 Call Staff"

        }

    </button>

    <div className="die-badge">

        <div className="num">
            {tableNumber ?? "–"}
        </div>

        <div className="lbl">
            Table
        </div>

    </div>

</div>

</div>

      {tableNumber === null && (
        <div className="no-table-banner">
          No table detected from your QR code. Enter it manually:
          <input
            type="number"
            min={1}
            placeholder="#"
            value={manualValue}
            onChange={(e) => setManualValue(e.target.value)}
          />
          <button
            onClick={() => {
              const v = parseInt(manualValue, 10);
              if (v > 0) onSetTable(v);
            }}
          >
            Set
          </button>
        </div>
      )}
    </header>
  );
}
