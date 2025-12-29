# History Panel Implementation Guide

## Overview
Đã implement HistoryPanel cho assign page dựa trên logic từ working/[id] page.

## Cấu trúc Implementation

### 1. **Component HistoryPanel** (`app/working/[id]/components/HistoryPanel.tsx`)
- **Pure Presentational Component** - chỉ hiển thị UI
- **Props:**
  - `logs`: Array<{ timestamp: string; message: string }> - Danh sách lịch sử
  - `onReset`: () => void - Callback để reset lịch sử
- **Features:**
  - Hiển thị danh sách logs
  - Nút reset với icon RotateCcw
  - Scroll được khi có nhiều logs
  - Hiển thị "履歴なし" khi không có logs

### 2. **Shared Hook** (`hooks/useScheduleBoard.ts`)
- **Logic chung** cho tất cả schedule boards
- **State quản lý:**
  - `drivers`: Danh sách drivers
  - `unassignedWorks`: Công việc chưa phân công
  - `historyLogs`: Lịch sử thay đổi
- **Functions:**
  - `addHistory(message)`: Thêm log mới với timestamp
  - `handleReset()`: Reset về state ban đầu và xóa logs
  - `handleDragEnd()`: Xử lý drag & drop (tự động log khi `enableHistory: true`)
- **Config:**
  ```typescript
  {
    initialDrivers: Driver[],
    initialUnassignedWorks: Record<number, DailyStatus[]>,
    initialHistoryLogs: [],
    enableAssistantLogic: boolean, // true cho details, false cho assign
    enableHistory: boolean         // true để bật tracking
  }
  ```

### 3. **Page-specific Hook** (`app/working/[id]/assign/hooks/useAssignScheduleBoard.ts`)
- Wrapper cho shared hook
- Config đặc thù cho assign page:
  - `enableAssistantLogic: false` - Logic đơn giản hơn
  - `enableHistory: true` - Bật history tracking
- **TODO**: Cần thêm initial data thật cho assign page

### 4. **Integration trong Assign Page**

#### `page.tsx`
```tsx
const {
    historyLogs,
    handleReset,
    // ... other handlers
} = useAssignScheduleBoard();

<FooterActions 
    historyLogs={historyLogs}
    onReset={handleReset}
/>
```

#### `footer-actions.tsx`
```tsx
interface FooterActionsProps {
    historyLogs: { timestamp: string; message: string }[];
    onReset: () => void;
}

<HistoryPanel logs={historyLogs} onReset={onReset} />
```

## Cách History Logs được tạo

### Tự động (khi `enableHistory: true`):
1. **Drag & Drop Assignment:**
   - `"{driverName} に {taskCode} を割り当てました"`
   - Ví dụ: "運転手A に A-01 を割り当てました"

2. **Move Task Between Drivers:**
   - `"{taskCode} を {sourceDriver} から {targetDriver} に移動しました"`
   - Ví dụ: "A-01 を 運転手A から 運転手B に移動しました"

3. **Reset:**
   - `"スケジュールをリセットしました"`

### Thủ công (nếu cần):
```tsx
const hook = useAssignScheduleBoard();
// hook.addHistory sẽ không được export, cần modify hook nếu cần
```

## Timestamp Format
- Sử dụng `new Date().toLocaleString("ja-JP")`
- Format: "2025/12/26 8:40:38" (Japanese locale)

## Styling
- Background: `bg-[#FFF9F5]` với border `border-[#F5E6D8]`
- Max height: `max-h-[140px]` với scroll
- Width trong footer: `w-80`

## Next Steps (TODO)
1. ✅ Tạo useAssignScheduleBoard hook
2. ✅ Integrate vào page.tsx
3. ✅ Update footer-actions.tsx với HistoryPanel
4. ⏳ **Thêm initial data thật cho assign page**
5. ⏳ **Test drag & drop để xem logs có hoạt động không**
6. ⏳ **Có thể thêm custom log messages cho các actions đặc thù của assign page**

## Comparison: Details vs Assign

| Feature | Details (/working/[id]) | Assign (/working/[id]/assign) |
|---------|------------------------|-------------------------------|
| Assistant Logic | ✅ Complex | ❌ Simple |
| History Tracking | ✅ Enabled | ✅ Enabled |
| Hook Location | `hooks/useScheduleBoard.ts` | `assign/hooks/useAssignScheduleBoard.ts` |
| UI Location | Footer trong table | Footer trong page |
| Initial Data | `MOCK_DRIVERS`, `FOOTER_DATA` | TODO: Cần thêm |
