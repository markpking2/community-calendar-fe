import {renderHook, act} from '@testing-library/react-hooks'
import useGeo from '../useGeo'
// create mock of navigator.geolocation
const getCurrentPosition = jest.fn()

// create assing mock function as method of geolocation
Object.assign(window.navigator.geolocation, {
  getCurrentPosition,
})

describe('Tests for getPosition', () => {
  beforeEach(() =>
    // reset mock.calls and mock.instances
    jest.clearAllMocks(),
  )

  test('Should return empty object ', () => {
    const {result} = renderHook(() => useGeo())
    expect(getCurrentPosition).toHaveBeenCalledTimes(1)
    expect(typeof result.current.userPosition).toBe('object')
  })

  test("Should return user's latitude and longitude when getUserPosition is called", () => {
    const testData = {coords: {latitude: 40, longitude: 80}}

    // initialize the hook
    const {result} = renderHook(() => useGeo())
    //userPosition should be an empty object
    expect(result.current.userPosition.latitude).toBeUndefined()
    // component was mounted  which fired useEffect which fires geolocation.getCurrentPosition
    expect(getCurrentPosition).toHaveBeenCalledTimes(1)

    getCurrentPosition.mockImplementation(() =>
      result.current.setUserPosition(testData),
    )
    // call setUserPosition
    act(() => {
      result.current.getUserPosition(testData)
    })

    // should have called geolocation.getCurrentPosition
    expect(getCurrentPosition).toHaveBeenCalledTimes(2)
    //  userPosition  should now have  coordinates
    expect(result.current.userPosition).toBe(testData)
  })
})
