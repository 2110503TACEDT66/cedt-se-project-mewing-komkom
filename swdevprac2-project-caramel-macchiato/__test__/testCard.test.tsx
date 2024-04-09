import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "@/components/Card";
// Mock getSpaces function
const mockspaceNotfull = {
  _id: "65e59b449b1136c8abcf54c9",
  name: "Samyan Co-op",
  address:
    "2nd Floor Samyan Mitrtown 944/1 Rama 4 Road, Wangmai, Pathumwan, Bangkok 10330CHIANGMAI",
  tel: "081530",
  openTime: "10:00",
  closeTime: "22:00",
  remaining: 72,
  __v: 0,
  image:
    "https://www.mangozero.com/wp-content/uploads/2019/10/samyancoop-02-2-1-1080x630.jpg",
  reservation: [],
  id: "65e59b449b1136c8abcf54c9",
};
const mockspaceFull = {
  _id: "65e5c4d2ae888061f1f82bcd",
  name: "Kloud",
  address:
    "2nd Floor Samyan Mitrtown 944/1 Rama 4 Road, Wangmai, Pathumwan, Bangkok 10330",
  tel: "081530",
  openTime: "10:00",
  closeTime: "22:00",
  remaining: 0,
  __v: 0,
  image:
    "https://images.workpointtoday.com/workpointnews/2022/07/21174901/1658400538_89366_KLOUDbyKBankFloor1.png",
  reservation: [],
  id: "65e5c4d2ae888061f1f82bcd",
};
describe("Card test", () => {
  afterEach(() => {
    cleanup(); // Clean up the DOM after each test
  });

  it("renders card data correctly with remaining seats", async () => {
    render(<Card data={mockspaceNotfull} />);
    expect(screen.getByText(mockspaceNotfull.name)).toBeInTheDocument();
    expect(screen.getByText(`มีที่ว่าง`)).toBeInTheDocument(); // Assuming remaining > 0
    expect(
      screen.getByText(
        `${mockspaceNotfull.openTime} - ${mockspaceNotfull.closeTime}`
      )
    ).toBeInTheDocument();
  });

  it("renders card data correctly when seats are full", async () => {
    render(<Card data={mockspaceFull} />);
    expect(screen.getByText(mockspaceFull.name)).toBeInTheDocument();
    expect(screen.getByText(`เต็ม`)).toBeInTheDocument(); // Assuming remaining > 0
    expect(
      screen.getByText(`${mockspaceFull.openTime} - ${mockspaceFull.closeTime}`)
    ).toBeInTheDocument();
  });
});
